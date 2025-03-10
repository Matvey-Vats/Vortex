import { fetchSearchResults, setSearchQuery } from '@/store/slices/searchSlice'
import { AppDispatch, RootState } from '@/store/store'
import { FC, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

const Search: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const [value, setValue] = useState('')
	const { query, type, results } = useSelector(
		(state: RootState) => state.search
	)

	const handleSearchClick = () => {
		dispatch(setSearchQuery(value))
		dispatch(fetchSearchResults({ query: value, type }))
		setValue('')
	}

	return (
		<div className='flex flex-row gap-x-5 max-w-[450px] w-full'>
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				type='text'
				placeholder='Search...'
				className='border-b-1 border-b-[#FF3B3B] p-2 w-full text-white outline-none'
			/>
			<button
				onClick={handleSearchClick}
				className='bg-[#FF3B3B] p-2 rounded-lg cursor-pointer'
			>
				<BiSearch size={25} className='cursor-pointer' />
			</button>
		</div>
	)
}

export default Search
