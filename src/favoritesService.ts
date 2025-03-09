import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { auth, db } from './firebase'

export const addMovieToFavorites = async (movieId: string) => {
	const user = auth.currentUser
	if (!user) throw new Error('user is undefined')

	const userFavoritesRef = doc(db, 'favorites', user.uid)

	const docSnap = await getDoc(userFavoritesRef)

	if (docSnap.exists()) {
		await updateDoc(userFavoritesRef, {
			movies: arrayUnion(movieId),
		})
	} else {
		await setDoc(userFavoritesRef, {
			movies: [movieId],
			tvShows: [],
		})
	}
}

export const removeMovieFromFavorites = async (movie: string) => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authoraized')

		const userRef = doc(db, 'favorites', user.uid)

		await updateDoc(userRef, {
			movies: arrayRemove(movie),
		})
	} catch (error) {
		console.error('Error of removing movie from favorites ', error)
	}
}

export const getFavoriteMovies = async (): Promise<string[]> => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authoraized')

		const userRef = doc(db, 'favorites', user.uid)
		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			return docSnap.data().movies || []
		} else {
			await setDoc(userRef, { movies: [] })
			return []
		}
	} catch (error) {
		console.error('Error of get movies from favorites ', error)
		return []
	}
}

export const addTvShowToFavorites = async (tvId: string) => {
	const user = auth.currentUser
	if (!user) throw new Error('user is undefined')

	const userFavoritesRef = doc(db, 'favorites', user.uid)

	const docSnap = await getDoc(userFavoritesRef)

	if (docSnap.exists()) {
		await updateDoc(userFavoritesRef, {
			tvShows: arrayUnion(tvId),
		})
	} else {
		await setDoc(userFavoritesRef, {
			movies: [],
			tvShows: [tvId],
		})
	}
}

export const removeTvShowFromFavorites = async (tvId: string) => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authoraized')

		const userRef = doc(db, 'favorites', user.uid)

		await updateDoc(userRef, {
			tvShows: arrayRemove(tvId),
		})
	} catch (error) {
		console.error('Error of removing movie from favorites ', error)
	}
}
