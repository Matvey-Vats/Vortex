'use client'
import DataStatus from '@/components/Sections/DataStatus'
import { ITVShow } from '@/components/Sections/Home/TVShows/TopRatedTV'
import TVBanner from '@/components/Sections/TVDetails/TVBanner'
import TVDetailsContent from '@/components/Sections/TVDetails/TVDetailsContent'
import SliderTemplate from '@/components/Sliders/SliderTemplate'
import {
	useGetByTypeAndIdQuery,
	useGetSimilarByIdQuery,
} from '@/store/api/apiSlice'
import getImageUrl from '@/utils/getImageUrl'
import { useParams } from 'next/navigation'

const TVShowDetails = () => {
	const { id } = useParams()
	const { data, isLoading, isError, isSuccess } = useGetByTypeAndIdQuery(
		{
			type: 'tv',
			id,
		},
		{
			selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
				data: data || undefined,
				isLoading,
				isError,
				isSuccess,
			}),
		}
	)
	const {
		data: similar,
		isLoading: isSimilarLoading,
		isError: isSimilarError,
	} = useGetSimilarByIdQuery({ type: 'tv', id })

	return (
		<div>
			<DataStatus isLoading={isLoading} isError={isError} />
			{isSuccess && (
				<>
					<TVBanner {...data} />
					<div className='container'>
						<TVDetailsContent {...data} />

						{similar?.results && (
							<div>
								<h3 className='text-4xl font-bold mb-5'>Similar</h3>
								<DataStatus
									isLoading={isSimilarLoading}
									isError={isSimilarError}
								/>
								<SliderTemplate
									type='movie'
									items={similar?.results}
									getImage={(item: ITVShow) => getImageUrl(item.poster_path)}
									renderContent={item => (
										<div key={item.id}>
											<div className='p-2 rounded-md'>
												<h3 className='text-2xl font-semibold'>{item.name}</h3>
												<p className='text-md'>
													⭐ {item.vote_average.toFixed(1)}
												</p>
											</div>
										</div>
									)}
								/>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default TVShowDetails
