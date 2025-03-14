'use client'

import DataStatus from '@/components/Sections/DataStatus'
import MovieBanner from '@/components/Sections/MovieDetails/MovieBanner'
import MovieDetailsContent from '@/components/Sections/MovieDetails/MovieDetailsContent'
import { IMovie } from '@/components/Sliders/HeroSlider'
import SliderTemplate from '@/components/Sliders/SliderTemplate'
import Spinner from '@/components/Spinner'

import { useGetByTypeAndIdQuery } from '@/store/api/commonApi'
import {
	useGetSimilarMoviesQuery,
	useGetVideosByIdQuery,
} from '@/store/api/moviesApi'
import getImageUrl from '@/utils/getImageUrl'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

export interface IGenre {
	id: number
	name: string
}

export interface ICountry {
	iso_3166_1: string
	name: string
}

interface IMovieResponse {
	backdrop_path: string
	genres: IGenre[]
	title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	runtime: number
	tagline: string
	vote_average: number
	production_countries: ICountry
}

interface IVideo {
	id: number
	key: string
	name: string
}

const VideoPlayer = dynamic(() => import('../../../components/VideoPlayer'), {
	loading: () => <Spinner />,
	ssr: false,
})

const MovieDetails = () => {
	const { id } = useParams()
	const { data, isLoading, isError, isSuccess } = useGetByTypeAndIdQuery(
		{
			type: 'movie',
			id,
		},
		{
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data || undefined,
				isLoading,
				isError,
				isSuccess,
			}),
		}
	)
	const {
		data: similar,
		isLoading: isSimilarLoading,
		isError: isSimilarError,
	} = useGetSimilarMoviesQuery(Number(id))

	const { data: videos } = useGetVideosByIdQuery(Number(id))

	const video = videos?.results.find((item: IVideo) =>
		item.name.includes('Trailer')
	)

	return (
		<div>
			<DataStatus isLoading={isLoading} isError={isError} />
			{isSuccess && (
				<>
					<MovieBanner {...data} />
					<div className='container'>
						<MovieDetailsContent {...data} />

						{video && (
							<div className='mb-20'>
								<VideoPlayer videoKey={video?.key} />
							</div>
						)}

						{similar?.results && (
							<div>
								<h3 className='text-4xl font-bold mb-5'>Similar</h3>
								<DataStatus
									isLoading={isSimilarLoading}
									isError={isSimilarError}
								/>
								<SliderTemplate
									type='movies'
									items={similar?.results}
									getImage={(item: IMovie) => getImageUrl(item.poster_path)}
									renderContent={item => (
										<div key={item.id}>
											<div className='p-2 rounded-md'>
												<h3 className='text-2xl font-semibold'>{item.title}</h3>
												<p className='text-md'>
													⭐ {item.vote_average.toFixed(1)}
												</p>
											</div>
										</div>
									)}
								/>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default MovieDetails
