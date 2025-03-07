'use client'

import Spinner from '@/components/Spinner'
import { useGetMovieListQuery } from '@/store/api/apiSlice'
import { useEffect, useState } from 'react'
import HeroSlider from '../../Sliders/HeroSlider'

const Hero = () => {
	const { data, isLoading } = useGetMovieListQuery(1)

	const [movies, setMovies] = useState([])

	useEffect(() => {
		if (data?.results) {
			setMovies(data.results)
		}
	}, [data])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<HeroSlider items={movies || []} />
		</div>
	)
}

export default Hero
