'use client'

import { IMovie } from '@/components/Sliders/HeroSlider'
import SliderTemplate from '@/components/Sliders/SliderTemplate'
import { useGetMovieListQuery } from '@/store/api/apiSlice'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC, memo, useMemo } from 'react'
import DataStatus from '../../DataStatus'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const MovieList: FC = memo(() => {
	const {
		data: movies,
		isLoading,
		isError,
		isSuccess,
	} = useGetMovieListQuery(2, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data?.results || undefined,
			isLoading,
			isError,
			isSuccess,
		}),
	})

	const moviess = useMemo(() => {
		return movies || []
	}, [movies])

	return (
		<section className='my-10'>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					Movies
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && (
					<div>
						<SliderTemplate
							items={moviess || []}
							type='movies'
							getImage={item => getImageUrl(item.poster_path)}
							renderContent={(item: IMovie) => (
								<div>
									<div className='p-2 rounded-md'>
										<h3 className='text-2xl font-semibold'>{item.title}</h3>
										<p className='text-md'>⭐ {item.vote_average.toFixed(1)}</p>
									</div>
								</div>
							)}
						/>
					</div>
				)}
			</div>
		</section>
	)
})

export default MovieList
