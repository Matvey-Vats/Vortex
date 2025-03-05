'use client'

import { useGetMovieListQuery } from '@/store/api/apiSlice'
import { useEffect, useState } from 'react'
import HeroSlider from '../Sliders/HeroSlider'

const Hero = () => {
	const { data, isLoading } = useGetMovieListQuery(1)

	const [movies, setMovies] = useState([])

	useEffect(() => {
		if (data?.results) {
			setMovies(data.results)
		}
	}, [data])

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen space-x-2'>
				<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse'></div>
				<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse200'></div>
				<div className='w-2 h-8 bg-[#FF3B3B] animate-pulse400'></div>
			</div>
		)
	}

	return (
		<div>
			<HeroSlider items={movies || []} />
		</div>
	)
}

export default Hero
