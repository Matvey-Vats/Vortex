'use client'
import Pagination from '@/components/Pagination'
import { useGetShowsByPropertyQuery } from '@/store/api/apiSlice'
import { RootState } from '@/store/store'
import { Orbitron } from 'next/font/google'
import { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import DataStatus from '../DataStatus'
import { ITVShow } from '../Home/TVShows/TopRatedTV'
import Sort from '../Sort'
import TVCard from './TVCard'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const AllTVShows: FC = () => {
	const [page, setPage] = useState(1)
	const scrollRef = useRef<HTMLElement | null>(null)
	const { value } = useSelector((state: RootState) => state.tv)

	const {
		data: shows,
		isLoading,
		isError,
	} = useGetShowsByPropertyQuery(
		{ property: value.property, page },
		{
			selectFromResult: ({ data, isLoading, isError }) => ({
				data: data || undefined,
				isLoading,
				isError,
			}),
		}
	)

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}, [page])

	const handleNextPage = () => setPage(prev => prev + 1)
	const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1))

	return (
		<section ref={scrollRef} className='mt-20 mb-10'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<h2
						className={`${orbitron.className} font-bold text-4xl mb-5 max-[550px]:text-3xl`}
					>
						TV Shows
					</h2>
					<Sort isForTV={true} />
				</div>

				<DataStatus isLoading={isLoading} isError={isError} />

				<div className='grid grid-cols-3 gap-5 max-[1070px]:grid-cols-2 max-[730px]:grid-cols-1'>
					{shows?.results?.map((item: ITVShow) => (
						<TVCard key={item.id} {...item} />
					))}
				</div>
			</div>

			{shows && shows.total_pages > 1 && (
				<Pagination
					page={page}
					totalPages={shows.total_pages}
					handleNextPage={handleNextPage}
					handlePrevPage={handlePrevPage}
				/>
			)}
		</section>
	)
}

export default AllTVShows
