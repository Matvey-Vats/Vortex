'use client'
import Hero from '@/components/Sections/Home/Hero'
import MovieList from '@/components/Sections/Home/Movies/MovieList'
import PopularMovies from '@/components/Sections/Home/Movies/PopularMovies'
import TopRatedMovies from '@/components/Sections/Home/Movies/TopRatedMovies'
import PopularPeopleList from '@/components/Sections/Home/People/PopularPeopleList'
import TopRatedTV from '@/components/Sections/Home/TVShows/TopRatedTV'
import TVList from '@/components/Sections/Home/TVShows/TVList'
import { setUser } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home() {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		const savedUser = localStorage.getItem('user')

		if (savedUser) {
			dispatch(setUser(savedUser))
		}
	}, [dispatch])

	return (
		<>
			<Hero />
			<MovieList />
			<TVList />
			<PopularMovies />
			<TopRatedMovies />
			<TopRatedTV />
			<PopularPeopleList />
		</>
	)
}
