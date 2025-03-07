import getImageUrl from '@/utils/getImageUrl'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
	name: string
	backdrop_path: string
	tagline: string
	vote_average: number
}

const TVBanner: FC<Props> = ({
	name,
	backdrop_path,
	tagline,
	vote_average,
}) => {
	return (
		<div className='relative w-full h-[800px] mb-20'>
			<Image
				src={getImageUrl(backdrop_path)}
				alt={name}
				fill
				objectFit='cover'
				className='w-full h-full object-cover'
				priority
			/>
			<div className='absolute inset-0 bg-black opacity-50' />
			<div className='absolute bottom-30 left-30 text-white'>
				<h2 className='text-8xl font-bold'>{name}</h2>
				<p className='text-xl'>{tagline}</p>
				<p className='text-xl mt-4 font-bold'>
					Rating: {vote_average.toFixed(1)}
				</p>
			</div>
		</div>
	)
}

export default TVBanner
