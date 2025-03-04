'use client'

import { useGetMovieListQuery } from '@/store/api/apiSlice'
import Image from 'next/image'

const Hero = () => {
	const { data } = useGetMovieListQuery('')

	if (!data) {
		return <h1>loading...</h1>
	}

	return (
		<div>
			{data &&
				data?.results.map((item: any) => (
					<div key={item.id} className='relative w-full h-[500px] md:h-[700px]'>
						<Image
							src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
							alt=''
							fill
							className='object-cover'
						/>
					</div>
				))}
		</div>
	)
}

export default Hero
