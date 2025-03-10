'use client'
import getImageUrl from '@/utils/getImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface IPeople {
	id: number
	gender: number
	name: string
	profile_path: string
	media_type: string
}

type Props = {
	id: number
	profile_path: string
	name: string
}

const PersonCard: FC<Props> = ({ id, profile_path, name }) => {
	console.log('RENDERING PERSON CARD')

	const imageUrl = getImageUrl(profile_path)

	if (!imageUrl) return <div>Image not available</div>

	return (
		<Link href={`/people/${id}`} className='px-2 cursor-pointer'>
			<div className='relative w-full h-[500px] group'>
				<Image
					src={imageUrl}
					alt={`${name} poster`}
					layout='fill'
					objectFit='cover'
					className='rounded-lg'
					sizes='(max-width: 440px) 100vw, 1200px'
				/>
				<div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg' />

				<div className='absolute bottom-4 left-4 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<div>
						<div className='p-2 rounded-md'>
							<h3 className='text-2xl font-semibold'>{name}</h3>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PersonCard
