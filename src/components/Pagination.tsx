import { FC } from 'react'

type Props = {
	page: number
	totalPages: number
	handleNextPage: () => void
	handlePrevPage: () => void
}

const Pagination: FC<Props> = ({
	page,
	totalPages,
	handleNextPage,
	handlePrevPage,
}) => {
	const isFirstPage = page === 1
	const isLastPage = page === totalPages

	return (
		<div className='flex items-center justify-center mt-5 gap-5'>
			<button
				className='text-white cursor-pointer bg-pink-600 py-1 px-3 rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 hover:bg-pink-700 active:scale-95'
				onClick={handlePrevPage}
				disabled={isFirstPage}
			>
				Prev
			</button>
			<span className='text-white text-lg font-semibold'>
				{page} / {totalPages}
			</span>
			<button
				className='text-white cursor-pointer bg-pink-600 py-1 px-3 rounded-xl disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 hover:bg-pink-700 active:scale-95'
				onClick={handleNextPage}
				disabled={isLastPage}
			>
				Next
			</button>
		</div>
	)
}

export default Pagination
