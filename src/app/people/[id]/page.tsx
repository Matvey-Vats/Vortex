'use client'
import Spinner from '@/components/Spinner'

import { useGetByTypeAndIdQuery } from '@/store/api/commonApi'
import getImageUrl from '@/utils/getImageUrl'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const PersonDetails = () => {
	const { id } = useParams()
	const { data, isLoading, isError, isSuccess } = useGetByTypeAndIdQuery({
		type: 'person',
		id,
	})

	return (
		<div>
			<div className='container'>
				{isLoading && <Spinner />}
				{isError && (
					<p className='text=center text-3xl text-red-500'>
						Something went wrong
					</p>
				)}
				{isSuccess && (
					<div className='flex items-start gap-y-5 justify-between max-[1200px]:flex-col max-[1200px]:items-center'>
						<Image
							src={getImageUrl(data.profile_path)}
							alt={data.name}
							width={500}
							height={700}
							objectFit='cover'
							className='rounded-md'
							priority
						/>
						<div className='max-w-[600px]'>
							<div className='flex gap-2 flex-wrap justify-between items-center mb-5'>
								<h3 className='text-4xl font-bold'>{data.name}</h3>
								<p className='mt-5 font-bold'>Born: {data.birthday}</p>
							</div>
							<p className='font-bold mb-10'>
								Place of birth: {data.place_of_birth}
							</p>
							<p className=''>{data.biography}</p>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PersonDetails
