import { IValue, setValue } from '@/store/slices/tvSlice'
import { AppDispatch, RootState } from '@/store/store'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const tvTypeList = [
	{ id: 1, value: 'Popular', property: 'popular' },
	{ id: 2, value: 'Top Rated', property: 'top_rated' },
]

const Sort: FC = () => {
	const sortRef = useRef<HTMLDivElement | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const { value } = useSelector((state: RootState) => state.tv)
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

	const onClickSort = (obj: IValue) => {
		dispatch(setValue(obj))
		setIsOpen(false)
	}

	return (
		<div ref={sortRef} className='relative inline-block text-left'>
			<div
				onClick={() => setIsOpen(prev => !prev)}
				className='cursor-pointer px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 hover:bg-gray-700 transition'
			>
				<p className=''>
					<span>{value.value}</span>
				</p>
			</div>
			<div
				className={`absolute z-50 left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg transition-all duration-200 ${
					isOpen
						? 'opacity-100 scale-100 visible'
						: 'opacity-0 scale-95 invisible'
				}`}
			>
				<ul>
					{tvTypeList.map(obj => (
						<li
							key={obj.id}
							onClick={() => onClickSort(obj)}
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
