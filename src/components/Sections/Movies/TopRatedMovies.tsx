'use client'

import SliderTemplate from '@/components/Sliders/SliderTemplate'
import { useGetTopRatedQuery } from '@/store/api/apiSlice'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC, useEffect, useState } from 'react'
import DataStatus from '../DataStatus'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const TopRatedMovies: FC = () => {
	const { data, isLoading, isError, isSuccess } = useGetTopRatedQuery(
		{
			type: 'movie',
			page: 1,
		},
		{
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data?.results || undefined,
				isLoading,
				isError,
				isSuccess,
			}),
		}
	)
	const [movies, setMovies] = useState([])

	useEffect(() => {
		if (data) {
			setMovies(data)
		}
	}, [data])

	return (
		<section className='my-10'>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					Top Rated Movies
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && (
					<div>
						<SliderTemplate
							items={movies || []}
							getImage={(item: any) => getImageUrl(item.poster_path)}
							renderContent={item => (
								<div>
									<div className='p-2 rounded-md'>
										<h3 className='text-2xl font-semibold'>{item.title}</h3>
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

export default TopRatedMovies
