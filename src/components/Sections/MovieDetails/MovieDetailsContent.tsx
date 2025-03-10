import Image from 'next/image'
import { FC } from 'react'

import { ICountry, IGenre } from '@/app/movies/[id]/page'
import LikeButton from '@/components/LikeButton'
import { IMovie } from '@/components/Sliders/HeroSlider'
import getImageUrl from '@/utils/getImageUrl'

type Props = {
	id: number
	title: string
	poster_path: string
	runtime: number
	overview: string
	release_date: string
	production_countries: ICountry[]
	genres: IGenre[]
	vote_average: number
}

const MovieDetailsContent: FC<Props> = ({
	id,
	title,
	poster_path,
	runtime,
	overview,
	release_date,
	production_countries,
	genres,
	vote_average,
}) => {
	return (
		<div className='mb-20 gap-5 flex items-start justify-between max-[1170px]:flex-col max-[1170px]:items-center'>
			<Image
				src={getImageUrl(poster_path)}
				alt={title}
				width={500}
				height={700}
				objectFit='cover'
				className='rounded-md'
				priority
			/>
			<div className='max-w-[600px]'>
				<div className='flex justify-between gap-2 flex-wrap items-center mb-5'>
					<h3 className='text-4xl font-bold'>{title}</h3>
					<p className='text-2xl font-medium'>{runtime} mins.</p>
				</div>
				<p className=''>{overview}</p>
				<p className='mt-5 font-bold'>Release: {release_date}</p>
				{production_countries && (
					<p className='font-bold'>Country: {production_countries[0]?.name}</p>
				)}

				<div className='flex items-end justify-between'>
					{genres.length > 0 && (
						<div>
							<h4 className='mt-10 text-2xl'>Genres</h4>
							<ul>
								{genres.map((genre: IGenre) => (
									<li key={genre.id}>{genre.name}</li>
								))}
							</ul>
						</div>
					)}
					<LikeButton
						item={{ id, title, poster_path, vote_average } as IMovie}
						type='movie'
					/>
				</div>
			</div>
		</div>
	)
}

export default MovieDetailsContent
