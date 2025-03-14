'use client'

import Filter from '@/components/Filter'
import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import DataStatus from '@/components/Sections/DataStatus'
import { ITVShow } from '@/components/Sections/Home/TVShows/TopRatedTV'
import MovieCard from '@/components/Sections/Movies/MovieCard'
import TVCard from '@/components/Sections/Tv/TVCard'
import { IMovie } from '@/components/Sliders/HeroSlider'
import { useGetByTypeAndPropertyQuery } from '@/store/api/commonApi'
import { fetchSearchResults, setSearchQuery } from '@/store/slices/searchSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Orbitron } from 'next/font/google'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IoClose } from 'react-icons/io5'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const SearchPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [page, setPage] = useState(1)
	const scrollRef = useRef<HTMLDivElement | null>(null)
	const { query, type, results } = useSelector(
		(state: RootState) => state.search
	)
	const { selectedGenre } = useSelector((state: RootState) => state.genres)

	const { data, isLoading, isError, isSuccess } = useGetByTypeAndPropertyQuery(
		{
			type,
			property: 'popular',
			page,
			pageSize: 40,
		},
		{
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data || undefined,
				isLoading,
				isError,
				isSuccess,
			}),
			skip: !!query,
		}
	)

	useEffect(() => {
		if (query.trim()) {
			dispatch(
				fetchSearchResults({
					query,
					type,
				})
			)
		}
	}, [page, query, type, dispatch, selectedGenre])

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}, [page])

	const displayedResults = useMemo(() => {
		let filteredResults = results?.length > 0 ? results : data?.results || []

		if (selectedGenre) {
			filteredResults = filteredResults.filter((item: IMovie | ITVShow) =>
				item.genre_ids.includes(selectedGenre.id)
			)
		}

		return {
			results: filteredResults,
			total_pages: data?.total_pages || 1,
		}
	}, [results, query, data, selectedGenre])

	const handleNextPage = () => setPage(prev => prev + 1)
	const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1))

	return (
		<div ref={scrollRef} className='my-10'>
			<div className='container'>
				<h2
					className={`${orbitron.className} font-bold text-4xl mb-5 max-[550px]:text-3xl`}
				>
					Search page
				</h2>
				<div className='flex gap-3 flex-wrap items-center justify-between'>
					<Search />
					<Filter setPage={setPage} />
				</div>

				{query && (
					<div className='flex items-center gap-5 mt-5'>
						<h2 className='text-white text-2xl'>Search results for: {query}</h2>
						<button
							onClick={() => dispatch(setSearchQuery(''))}
							className='cursor-pointer'
						>
							<IoClose size={25} />
						</button>
					</div>
				)}

				<DataStatus isLoading={isLoading} isError={isError} />

				{displayedResults.results.length > 0 ? (
					<div className='my-10 grid grid-cols-3 gap-5 max-[1070px]:grid-cols-2 max-[730px]:grid-cols-1'>
						{displayedResults.results.map((item: IMovie | ITVShow) => {
							if (type === 'movie') {
								return <MovieCard key={item.id} {...(item as IMovie)} />
							}
							if (type === 'tv') {
								return <TVCard key={item.id} {...(item as ITVShow)} />
							}
						})}
					</div>
				) : (
					isSuccess && (
						<div className='my-10'>
							<h2 className='text-white text-2xl'>
								No results found for: {query}
							</h2>
						</div>
					)
				)}

				{displayedResults?.total_pages > 1 && (
					<Pagination
						page={page}
						totalPages={data?.total_pages}
						handleNextPage={handleNextPage}
						handlePrevPage={handlePrevPage}
					/>
				)}
			</div>
		</div>
	)
}

export default SearchPage
