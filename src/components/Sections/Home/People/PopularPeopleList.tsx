'use client'

import SliderTemplate from '@/components/Sliders/SliderTemplate'
import { useGetPeoplePopularQuery } from '@/store/api/apiSlice'
import getImageUrl from '@/utils/getImageUrl'
import { Orbitron } from 'next/font/google'
import { FC } from 'react'
import DataStatus from '../../DataStatus'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

export interface IPeople {
	id: number
	name: string
	profile_path: string
}

const PopularPeopleList: FC = () => {
	const {
		data: people,
		isLoading,
		isError,
		isSuccess,
	} = useGetPeoplePopularQuery(1, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data?.results,
			isLoading,
			isError,
			isSuccess,
		}),
	})
	return (
		<section className='my-10'>
			<div className='container'>
				<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
					Popular People
				</h2>
				<DataStatus isLoading={isLoading} isError={isError} />
				{isSuccess && (
					<div>
						<SliderTemplate
							items={people || []}
							getImage={(item: IPeople) => getImageUrl(item.profile_path)}
							renderContent={item => (
								<div>
									<div className='p-2 rounded-md'>
										<h3 className='text-2xl font-semibold'>{item.name}</h3>
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

export default PopularPeopleList
