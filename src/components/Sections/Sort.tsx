import { IValue, setMovie, setTV } from '@/store/slices/mediaSlice'
import { AppDispatch, RootState } from '@/store/store'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const tvTypeList = [
	{ id: 1, value: 'Popular', property: 'popular' },
	{ id: 2, value: 'Top Rated', property: 'top_rated' },
]

const movieTypeList = [
	{ id: 1, value: 'Popular', property: 'popular' },
	{ id: 2, value: 'Top rated', property: 'top_rated' },
	{ id: 3, value: 'Upcoming', property: 'upcoming' },
	{ id: 4, value: 'Latest', property: 'latest' },
]

type Props = {
	isForMovie?: boolean
	isForTV?: boolean
}

const Sort: FC<Props> = ({ isForMovie, isForTV }) => {
	const sortRef = useRef<HTMLDivElement | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const tvValue = useSelector((state: RootState) => state.media.tv)
	const movieValue = useSelector((state: RootState) => state.media.movie)

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const handleClickOutside = (e: any) => {
			if (sortRef.current && !sortRef.current.contains(e.target)) {
				setIsOpen(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [isOpen])

	const handleSort = (obj: IValue) => {
		dispatch(isForTV ? setTV(obj) : setMovie(obj))
		setIsOpen(false)
	}

	return (
		<div ref={sortRef} className='relative inline-block text-left'>
			<div
				onClick={() => setIsOpen(prev => !prev)}
				className='cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 hover:bg-gray-700 transition'
			>
				<p>
					{isForTV && tvValue.value}
					{isForMovie && movieValue.value}
				</p>
			</div>
			<div
				className={`absolute z-50 right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg transition-all duration-200 ${
					isOpen
						? 'opacity-100 scale-100 visible'
						: 'opacity-0 scale-95 invisible'
				}`}
			>
				<ul>
					{isForTV &&
						tvTypeList.map(obj => (
							<li
								key={obj.id}
								onClick={() => handleSort(obj)}
								className={'px-4 py-2 hover:bg-gray-700 cursor-pointer'}
							>
								{obj.value}
							</li>
						))}
					{isForMovie &&
						movieTypeList.map(obj => (
							<li
								key={obj.id}
								onClick={() => handleSort(obj)}
								className={'px-4 py-2 hover:bg-gray-700 cursor-pointer'}
							>
								{obj.value}
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

export default Sort
