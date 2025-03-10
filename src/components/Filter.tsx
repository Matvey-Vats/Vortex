'use client'
import { IGenre } from '@/app/movies/[id]/page'
import { fetchGenres, setSelectedGenre } from '@/store/slices/genresSlice'
import { setType } from '@/store/slices/searchSlice'
import { AppDispatch, RootState } from '@/store/store'
import { FC, useEffect, useRef, useState } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'

const typesList = [
	{ name: 'TV Shows', property: 'tv' },
	{ name: 'Movies', property: 'movie' },
]

type Props = {
	setPage: (page: number) => void
}

const Filter: FC<Props> = ({ setPage }) => {
	const [isOpen, setIsOpen] = useState(false)
	const sortRef = useRef<HTMLDivElement | null>(null)
	const dispatch = useDispatch<AppDispatch>()
	const { genres, selectedGenre } = useSelector(
		(state: RootState) => state.genres
	)
	const { type } = useSelector((state: RootState) => state.search)

	const currentType = typesList.find(t => t.property === type)
	const selectedType = currentType ? currentType.name : 'All'

	useEffect(() => {
		dispatch(fetchGenres())

		if (sortRef.current) {
			const handleClickOutside = (e: any) => {
				if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
					setIsOpen(false)
				}
			}
			document.body.addEventListener('click', handleClickOutside)
			return () =>
				document.body.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleGenreClick = (genre: IGenre) => {
		dispatch(setSelectedGenre(genre))
		setIsOpen(false)
		setPage(1)
	}

	const handleTypeClick = (type: string) => {
		dispatch(setType(type))
		setIsOpen(false)
		setPage(1)
	}

	return (
		<div className='relative inline-block text-left'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300 shadow-md'
			>
				<p className='text-sm font-medium'>
					Filter by <span>Type: {selectedType}</span> & Genre:{' '}
					<span className='font-semibold text-gray-300'>
						{selectedGenre?.name || 'All'}
					</span>
				</p>
				<TiArrowSortedDown
					className={`w-4 h-4 transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			<div>
				{selectedGenre && (
					<button
						onClick={() => dispatch(setSelectedGenre(null))}
						className='text-md text-red-600 ml-2 cursor-pointer'
					>
						Clear Genre
					</button>
				)}
			</div>
			<div
				ref={sortRef}
				className={`absolute z-40 mt-2 w-[400px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg transition-all duration-300 overflow-hidden ${
					isOpen
						? 'opacity-100 scale-100 visible'
						: 'opacity-0 scale-95 invisible'
				} min-[767px]:right-0`}
			>
				<div className='grid grid-cols-2 gap-4 p-4 text-gray-300'>
					{/* By Type */}
					<div>
						<h4 className='text-md font-semibold text-white mb-2'>By Type</h4>
						<ul className='space-y-1'>
							{typesList.map((type, index) => (
								<li
									key={index}
									onClick={() => handleTypeClick(type.property)}
									className='px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition'
								>
									{type.name}
								</li>
							))}
						</ul>
					</div>

					{/* By Genre */}
					<div>
						<h4 className='text-md font-semibold text-white mb-2'>By Genre</h4>
						<ul className='space-y-1 grid grid-cols-2 gap-2'>
							{genres.map(genre => (
								<li
									key={genre.id}
									onClick={() => handleGenreClick(genre)}
									className='px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition'
								>
									{genre.name}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
