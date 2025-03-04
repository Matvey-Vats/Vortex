import { BiSearch } from 'react-icons/bi'

const Search = () => {
	return (
		<div className='flex flex-row gap-x-5'>
			<input
				type='text'
				placeholder='Search...'
				className='border-b-1 border-b-[#FF3B3B] p-2 w-[300px]'
			/>
			<button>
				<BiSearch size={25} className='cursor-pointer' />
			</button>
		</div>
	)
}

export default Search
