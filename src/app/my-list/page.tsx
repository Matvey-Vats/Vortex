'use client'

import { ITVShow } from '@/components/Sections/Home/TVShows/TopRatedTV'
import MovieCard from '@/components/Sections/Movies/MovieCard'
import TVCard from '@/components/Sections/Tv/TVCard'
import { IMovie } from '@/components/Sliders/HeroSlider'
import { getFavoriteMovies, getFavoriteTvShows } from '@/favoritesService'
import { auth } from '@/firebase'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const orbitron = Orbitron({ subsets: ['latin'], weight: '700' })

const MyList = () => {
	const [movies, setMovies] = useState<IMovie[]>([])
	const [tvShows, setTvShows] = useState<ITVShow[]>([])

	const user = auth.currentUser

	useEffect(() => {
		const fetchMoviesData = async () => {
			const moviesFromFavorites = await getFavoriteMovies()
			setMovies(moviesFromFavorites)
		}

		const fetchTvShowsData = async () => {
			const tvShowsFromFavorites = await getFavoriteTvShows()
			setTvShows(tvShowsFromFavorites)
		}

		if (user) {
			fetchMoviesData()
			fetchTvShowsData()
		}
	}, [user])

	return (
		<div>
			<div className='container'>
				{!user ? (
					<div className='text-center mt-20'>
						<h2 className={`${orbitron.className} text-3xl`}>
							You are not logged in
						</h2>
						<Link
							href={'/auth/login'}
							className='inline-block mt-4 bg-red-600 border-1 border-transparent px-7 py-2 rounded-md font-bold transition-all duration-300 hover:bg-transparent hover:border-red-600'
						>
							Log-in
						</Link>
					</div>
				) : (
					<>
						<h2 className={`${orbitron.className} font-bold text-4xl mb-5`}>
							My List
						</h2>
						{movies.length === 0 && tvShows.length === 0 && (
							<h3 className='text-center text-2xl font-bold'>List is Empty</h3>
						)}

						{movies.length > 0 && (
							<div className='mb-10'>
								<h3
									className={`${orbitron.className} font-medium text-2xl mb-2`}
								>
									Favorites Movies
								</h3>
								<div className='grid grid-cols-3'>
									{movies.map((movie: IMovie) => (
										<MovieCard key={movie.id} {...movie} />
									))}
								</div>
							</div>
						)}
						{tvShows.length > 0 && (
							<div>
								<h3
									className={`${orbitron.className} font-medium text-2xl mb-2`}
								>
									Favorites TV Shows
								</h3>
								<div className='grid grid-cols-3'>
									{tvShows.map((tvShow: ITVShow) => (
										<TVCard key={tvShow.id} {...tvShow} />
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default MyList
