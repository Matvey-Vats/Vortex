'use client'

import Spinner from '@/components/Spinner'
import { useGetMovieListQuery } from '@/store/api/moviesApi'
import { useMemo } from 'react'
import HeroSlider from '../../Sliders/HeroSlider'

const Hero = () => {
	const { data, isLoading } = useGetMovieListQuery(1)

	const movies = useMemo(() => {
		return data?.results || []
	}, [data])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<HeroSlider items={movies} />
		</div>
	)
}

export default Hero
