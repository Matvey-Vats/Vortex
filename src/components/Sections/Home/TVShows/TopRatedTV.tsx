'use client'
import SliderTemplate from '@/components/Sliders/SliderTemplate'
import { useGetTopRatedQuery } from '@/store/api/apiSlice'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC, useEffect, useState } from 'react'
import DataStatus from '../../DataStatus'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

export interface ITVShow {
	id: number
	name: string
	poster_path: string
	backdrop_path: string
	vote_average: number
}

const TopRatedTV: FC = () => {
	const {
		data: shows,
		isLoading,
		isError,
		isSuccess,
	} = useGetTopRatedQuery(
		{ type: 'tv', page: 1 },
		{
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data?.results || undefined,
				isLoading,
				isError,
				isSuccess,
			}),
		}
	)
	const [tvs, setTvs] = useState([])

	useEffect(() => {
		if (shows) {
			setTvs(shows)
		}
	}, [shows])
	return (
		<section className='my-10'>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					Top Rated TV Shows
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && (
					<div>
						<SliderTemplate
							type='tv'
							items={shows || []}
							getImage={(item: ITVShow) => getImageUrl(item.poster_path)}
							renderContent={item => (
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

export default TopRatedTV
