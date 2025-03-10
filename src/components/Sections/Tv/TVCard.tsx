import getImageUrl from '@/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'

type Props = {
	id: number
	name: string
	vote_average: number
	poster_path: string
}

const TVCard: FC<Props> = ({ id, name, vote_average, poster_path }) => {
	return (
		<Link href={`/tv/${id}`} className='px-2 cursor-pointer'>
			<div className='relative w-full h-[700px] group'>
				<Image
					src={getImageUrl(poster_path)}
					alt={`${name} poster`}
					layout='fill'
					objectFit='cover'
					className='rounded-lg'
					sizes='(max-width: 440px) 100vw, 1200px'
				/>
				<div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg' />

				<div className='absolute bottom-4 left-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<div className='p-2 rounded-md'>
						<h3 className='text-2xl font-semibold'>{name}</h3>
						<p className='text-md'>⭐ {vote_average?.toFixed(1)}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default memo(TVCard)
