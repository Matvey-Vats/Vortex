'use client'
import { useGetTVShowsListQuery } from '@/store/api/tvShowsApi'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC, useCallback } from 'react'
import SliderTemplate from '../../../Sliders/SliderTemplate'
import DataStatus from '../../DataStatus'
import { ITVShow } from './TopRatedTV'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const TVList: FC = () => {
	const {
		data: shows,
		isLoading,
		isError,
		isSuccess,
	} = useGetTVShowsListQuery(1, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data?.results || [],
			isLoading,
			isError,
			isSuccess,
		}),
	})

	const getImage = useCallback(
		(item: ITVShow) => getImageUrl(item.poster_path),
		[]
	)

	return (
		<section>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					TV Shows
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && (
					<div>
						<SliderTemplate
							type='tv'
							items={shows || []}
							getImage={getImage}
							renderContent={(item: ITVShow) => (
								<div>
									<div className='p-2 rounded-md'>
										<h3 className='text-2xl font-semibold'>{item.name}</h3>
										<p className='text-md'>⭐ {item.vote_average.toFixed(1)}</p>
									</div>
								</div>
							)}
						/>
					</div>
				)}
			</div>
		</section>
	)
}

export default TVList
