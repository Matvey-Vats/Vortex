'use client'
import {
	addMovieToFavorites,
	addTvShowToFavorites,
	removeMovieFromFavorites,
	removeTvShowFromFavorites,
} from '@/favoritesService'
import { auth, db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

type LikeButtonProps = {
	id: string
	type: 'movie' | 'tvShow'
}

const LikeButton = ({ id, type }: LikeButtonProps) => {
	const [isFavorite, setIsFavorite] = useState(false)
	const user = auth.currentUser

	useEffect(() => {
		if (!user) return

		const checkFavorite = async () => {
			const userFavoritesRef = doc(db, 'favorites', user.uid)
			const docSnap = await getDoc(userFavoritesRef)

			if (docSnap.exists()) {
				const data = docSnap.data()

				const isFavorite =
					type === 'movie'
						? data?.movies?.includes(id)
						: data?.tvShows?.includes(id)
				setIsFavorite(isFavorite)
			}
		}

		checkFavorite()
	}, [user, id, type])

	const toggleFavorite = async () => {
		if (!user) {
			alert('Please enter on your account')
			return
		}

		try {
			if (type === 'movie') {
				if (isFavorite) {
					await removeMovieFromFavorites(id)
				} else {
					await addMovieToFavorites(id)
				}
			} else {
				if (isFavorite) {
					await removeTvShowFromFavorites(id)
				} else {
					await addTvShowToFavorites(id)
				}
			}
			setIsFavorite(!isFavorite)
		} catch (error) {
			console.error('Error of favorite update ', error)
		}
	}

	return (
		<button onClick={toggleFavorite} className='cursor-pointer'>
			<FaHeart
				size={40}
				fill={isFavorite ? 'red' : 'gray'}
				className='transition-all duration-500 hover:fill-red-600 active:scale-90'
			/>
		</button>
	)
}

export default LikeButton
