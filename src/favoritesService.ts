import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ITVShow } from './components/Sections/Home/TVShows/TopRatedTV'
import { IMovie } from './components/Sliders/HeroSlider'
import { auth, db } from './firebase'

export const addMovieToFavorites = async (movie: IMovie) => {
	const user = auth.currentUser
	if (!user) throw new Error('User is not authenticated')

	const userFavoritesRef = doc(db, 'favorites', user.uid)
	const docSnap = await getDoc(userFavoritesRef)

	if (docSnap.exists()) {
		const favoriteMovies = docSnap.data().movies || []

		const isMovieAlreadyInFavorites = favoriteMovies.some(
			(favMovie: IMovie) => favMovie.id === movie.id
		)

		if (isMovieAlreadyInFavorites) {
			throw new Error('Movie already in favorites')
		}

		await updateDoc(userFavoritesRef, {
			movies: arrayUnion(movie),
		})
	} else {
		await setDoc(userFavoritesRef, {
			movies: [movie],
			tvShows: [],
		})
	}
}

export const removeMovieFromFavorites = async (movie: IMovie) => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authorized')

		const userRef = doc(db, 'favorites', user.uid)
		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			const data = docSnap.data()
			const updatedMovies = data.movies.filter(
				(favMovie: IMovie) => favMovie.id !== movie.id
			)

			await updateDoc(userRef, {
				movies: updatedMovies,
			})
		}
	} catch (error) {
		console.error('Error removing movie from favorites:', error)
	}
}

export const getFavoriteMovies = async (): Promise<IMovie[]> => {
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

export const addTvShowToFavorites = async (tvShow: ITVShow) => {
	const user = auth.currentUser
	if (!user) throw new Error('User is not authenticated')

	const userFavoritesRef = doc(db, 'favorites', user.uid)
	const docSnap = await getDoc(userFavoritesRef)

	if (docSnap.exists()) {
		const favoriteMovies = docSnap.data().movies || []

		const isMovieAlreadyInFavorites = favoriteMovies.some(
			(favTvShow: ITVShow) => favTvShow.id === tvShow.id
		)

		if (isMovieAlreadyInFavorites) {
			throw new Error('Movie already in favorites')
		}

		await updateDoc(userFavoritesRef, {
			tvShows: arrayUnion(tvShow),
		})
	} else {
		await setDoc(userFavoritesRef, {
			movies: [],
			tvShows: [tvShow],
		})
	}
}

export const removeTvShowFromFavorites = async (tvShow: ITVShow) => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authorized')

		const userRef = doc(db, 'favorites', user.uid)
		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			const data = docSnap.data()
			const updateTvShows = data.tvShows.filter(
				(favTvShow: ITVShow) => favTvShow.id !== tvShow.id
			)

			await updateDoc(userRef, {
				tvShows: updateTvShows,
			})
		}
	} catch (error) {
		console.error('Error removing tv show from favorites:', error)
	}
}

export const getFavoriteTvShows = async (): Promise<ITVShow[]> => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('User is not authoraized')

		const userRef = doc(db, 'favorites', user.uid)
		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			return docSnap.data().tvShows || []
		} else {
			await setDoc(userRef, { tvShows: [] })
			return []
		}
	} catch (error) {
		console.error('Error of get tv shows from favorites ', error)
		return []
	}
}
