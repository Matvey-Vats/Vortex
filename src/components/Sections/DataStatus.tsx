import { FC } from 'react'
import SliderLoader from './SliderLoader'

type Props = {
	isLoading: boolean
	isError?: boolean
}

const DataStatus: FC<Props> = ({ isLoading, isError }) => {
	if (isLoading) {
		return (
			<div className='container'>
				<div className='flex items-center justify-between'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index}>
							<SliderLoader />
						</div>
					))}
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='container'>
				<p className='text-red-500 text-3xl font-semibold text-center'>
					Error, failed to retrieve data
				</p>
			</div>
		)
	}

	return null
}

export default DataStatus
