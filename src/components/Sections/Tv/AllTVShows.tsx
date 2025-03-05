'use client'
import Pagination from '@/components/Pagination'
import { useGetTVShowsListQuery } from '@/store/api/apiSlice'
import { Orbitron } from 'next/font/google'
import { FC, useEffect, useRef, useState } from 'react'
import DataStatus from '../DataStatus'
import { ITVShow } from '../Home/TVShows/TopRatedTV'
import Sort from './Sort'
import TVCard from './TVCard'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const AllTVShows: FC = () => {
	const [page, setPage] = useState(1)
	const scrollRef = useRef<HTMLElement | null>(null)
	const {
		data: shows,
		isLoading,
		isError,
		isSuccess,
	} = useGetTVShowsListQuery(page, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data || undefined,
			isLoading,
			isError,
			isSuccess,
		}),
	})

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}, [page])

	const handleNextPage = () => {
		setPage(prev => prev + 1)
	}

	const handlePrevPage = () => {
		setPage(prev => Math.max(prev - 1, 1))
	}

	return (
		<section ref={scrollRef} className='mt-20 mb-10'>
			<div className='container'>
				<div className='flex items-center justify-between'>
					<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
						TV Shows
					</h2>
					<Sort />
				</div>

				<DataStatus isLoading={isLoading} isError={isError} />
				<div className='grid grid-cols-3 gap-10'>
					{shows &&
						shows.results.length > 0 &&
						shows?.results.map((item: ITVShow) => (
							<TVCard key={item.id} {...item} />
						))}
				</div>
			</div>
			{shows && (
				<Pagination
					page={page}
					totalPages={shows?.total_pages}
					handleNextPage={handleNextPage}
					handlePrevPage={handlePrevPage}
				/>
			)}
		</section>
	)
}

export default AllTVShows
