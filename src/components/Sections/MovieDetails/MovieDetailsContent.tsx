import Image from 'next/image'
import { FC } from 'react'

import { ICountry, IGenre } from '@/app/movies/[id]/page'
import getImageUrl from '@/utils/getImageUrl'

type Props = {
	title: string
	poster_path: string
	runtime: number
	overview: string
	release_date: string
	production_countries: ICountry[]
	genres: IGenre[]
}

const MovieDetailsContent: FC<Props> = ({
	title,
	poster_path,
	runtime,
	overview,
	release_date,
	production_countries,
	genres,
}) => {
	return (
		<div className='mb-20 flex items-start justify-between'>
			<Image
				src={getImageUrl(poster_path)}
				alt=''
				width={500}
				height={700}
				className='rounded-md'
			/>
			<div className='w-[600px]'>
				<div className='flex justify-between items-center mb-5'>
					<h3 className='text-4xl font-bold'>{title}</h3>
					<p className='text-2xl font-medium'>{runtime} mins.</p>
				</div>
				<p className=''>{overview}</p>
				<p className='mt-5 font-bold'>Release: {release_date}</p>
				{production_countries && (
					<p className='font-bold'>Country: {production_countries[0].name}</p>
				)}

				{genres.length > 0 && (
					<>
						<h4 className='mt-10 text-2xl'>Genres</h4>
						<ul>
							{genres.map((genre: IGenre) => (
								<li key={genre.id}>{genre.name}</li>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	)
}

export default MovieDetailsContent
