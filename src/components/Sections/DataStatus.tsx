import { FC } from 'react'
import SliderLoader from './SliderLoader'

type Props = {
	isLoading: boolean
	isError?: boolean
}

const DataStatus: FC<Props> = ({ isLoading, isError }) => {
	if (!isLoading && !isError) return null

	return (
		<div className='container flex items-center justify-between'>
			{isLoading ? (
				Array.from({ length: 3 }).map((_, index) => (
					<SliderLoader key={index} />
				))
			) : (
				<p className='text-red-500 text-3xl font-semibold text-center w-full'>
					Error, failed to retrieve data
				</p>
			)}
		</div>
	)
}

export default DataStatus
