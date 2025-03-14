'use client'
import SliderTemplate from '@/components/Sliders/SliderTemplate'
import { useGetTopRatedShowsQuery } from '@/store/api/tvShowsApi'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC, useCallback } from 'react'
import DataStatus from '../../DataStatus'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

export interface ITVShow {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
	vote_average: number
	genre_ids: number[]
}

const TopRatedTV: FC = () => {
	const {
		data: shows,
		isLoading,
		isError,
		isSuccess,
	} = useGetTopRatedShowsQuery(1, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data?.results || undefined,
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
		<section className='my-10'>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					Top Rated TV Shows
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && shows && (
					<SliderTemplate
						type='tv'
						items={shows}
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
				)}
			</div>
		</section>
	)
}

export default TopRatedTV
