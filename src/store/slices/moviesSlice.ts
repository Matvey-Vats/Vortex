import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IValue {
	id: number
	value: string
	property: string
}
export interface MovieState {
	movieSortValue: IValue
}

const initialState: MovieState = {
	movieSortValue: {
		id: 1,
		value: 'Popular',
		property: 'popular',
	},
}

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMovieSort(state, action: PayloadAction<IValue>) {
			state.movieSortValue = action.payload
		},
	},
})

export const { setMovieSort } = moviesSlice.actions

export default moviesSlice.reducer
