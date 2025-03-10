import { fetchSearchResults, setSearchQuery } from '@/store/slices/searchSlice'
import { AppDispatch, RootState } from '@/store/store'
import { FC, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

const Search: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [value, setValue] = useState('')
	const { type } = useSelector((state: RootState) => state.search)

	const handleSearch = () => {
		if (!value.trim()) return

		dispatch(setSearchQuery(value))
		dispatch(fetchSearchResults({ query: value, type }))
		setValue('')
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSearch()
	}

	return (
		<div className='flex gap-5 max-w-[450px] w-full'>
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				type='text'
				placeholder='Search...'
				className='border-b border-red-500 p-2 w-full text-white outline-none'
			/>
			<button
				onClick={handleSearch}
				className='bg-red-500 p-2 rounded-lg transition-all duration-300 hover:bg-red-600 active:scale-95'
			>
				<BiSearch size={25} />
			</button>
		</div>
	)
}

export default Search
