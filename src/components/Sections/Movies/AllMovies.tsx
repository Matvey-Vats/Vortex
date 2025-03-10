'use client'

import Pagination from '@/components/Pagination'
import { IMovie } from '@/components/Sliders/HeroSlider'
import { useGetMoviesByPropertyQuery } from '@/store/api/apiSlice'
import { RootState } from '@/store/store'
import { Orbitron } from 'next/font/google'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import DataStatus from '../DataStatus'
import Sort from '../Sort'
import MovieCard from './MovieCard'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const AllMovies: FC = () => {
	const [page, setPage] = useState(1)
	const value = useSelector((state: RootState) => state.media.movie)
	const {
		data: movies,
		isLoading,
		isError,
	} = useGetMoviesByPropertyQuery(
		{ property: value.property, page },
		{
			selectFromResult: ({ data, isLoading, isError }) => ({
				data: data || [],
				isLoading,
				isError,
			}),
		}
	)

	const handleNextPage = () => setPage(prev => prev + 1)
	const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1))

	return (
		<section className='mt-20 mb-10'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
						Movies
					</h2>
					<Sort isForMovie={true} />
				</div>

				<DataStatus isLoading={isLoading} isError={isError} />

				{movies && movies?.results?.length > 0 ? (
					<div className='grid grid-cols-3 gap-5 max-[1070px]:grid-cols-2 max-[730px]:grid-cols-1'>
						{movies?.results?.map((item: IMovie) => (
							<MovieCard key={item.id} {...item} />
						))}
					</div>
				) : (
					<p className='text-3xl text-center text-red-500 font-bold'>
						List is empty
					</p>
				)}
			</div>

			{movies && movies.total_pages > 1 && (
				<Pagination
					page={page}
					totalPages={movies.total_pages}
					handleNextPage={handleNextPage}
					handlePrevPage={handlePrevPage}
				/>
			)}
		</section>
	)
}

export default AllMovies
