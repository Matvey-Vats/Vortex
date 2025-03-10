'use client'
import {
	addMovieToFavorites,
	addTvShowToFavorites,
	removeMovieFromFavorites,
	removeTvShowFromFavorites,
} from '@/favoritesService'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { ITVShow } from './Sections/Home/TVShows/TopRatedTV'
import { IMovie } from './Sliders/HeroSlider'

type LikeButtonProps = {
	item: IMovie | ITVShow
	type: 'movie' | 'tvShow'
}

const LikeButton = ({ item, type }: LikeButtonProps) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const user = auth.currentUser

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			if (!currentUser) return
			const checkFavorite = async () => {
				const userFavoritesRef = doc(db, 'favorites', currentUser.uid)
				const docSnap = await getDoc(userFavoritesRef)

				if (docSnap.exists()) {
					const data = docSnap.data()
					const isFavorite =
						type === 'movie'
							? data?.movies?.some((movie: IMovie) => movie.id === item.id)
							: data?.tvShows?.some((tvShow: ITVShow) => tvShow.id === item.id)

					setIsFavorite(isFavorite)
				}
			}

			checkFavorite()
		})

		return () => unsubscribe()
	}, [item, type])

	const toggleFavorite = async () => {
		if (!user) {
			alert('Please enter on your account')
			return
		}

		setIsFavorite(prev => !prev)

		try {
			if (type === 'movie') {
				if (isFavorite) {
					await removeMovieFromFavorites(item as IMovie)
				} else {
					await addMovieToFavorites(item as IMovie)
				}
			} else {
				if (isFavorite) {
					await removeTvShowFromFavorites(item as ITVShow)
				} else {
					await addTvShowToFavorites(item as ITVShow)
				}
			}
		} catch (error) {
			console.error('Error updating favorite', error)
			setIsFavorite(prev => !prev)
		}
	}

	return (
		<button onClick={toggleFavorite} className='cursor-pointer'>
			<FaHeart
				size={40}
				fill={isFavorite ? 'red' : 'gray'}
				className='transition-colors duration-500 hover:fill-red-600 active:scale-90'
			/>
		</button>
	)
}

export default LikeButton
