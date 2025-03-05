import { FC } from 'react'

const Sort: FC = () => {
	return (
		<div className='relative'>
			<select className='block w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none'>
				<option value='all'>All</option>
				<option value='popular'>Popular</option>
				<option value='top'>Top Rated</option>
			</select>
		</div>
	)
}

export default Sort
