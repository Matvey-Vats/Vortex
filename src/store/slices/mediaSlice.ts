import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IValue {
	id: number
	value: string
	property: string
}

export interface MediaState {
	tv: IValue
	movie: IValue
}

const initialState: MediaState = {
	tv: {
		id: 1,
		value: 'Popular',
		property: 'popular',
	},
	movie: {
		id: 1,
		value: 'Popular',
		property: 'popular',
	},
}

export const mediaSlice = createSlice({
	name: 'media',
	initialState,
	reducers: {
		setTV(state, action: PayloadAction<IValue>) {
			state.tv = action.payload
		},
		setMovie(state, action: PayloadAction<IValue>) {
			state.movie = action.payload
		},
	},
})

export const { setTV, setMovie } = mediaSlice.actions

export default mediaSlice.reducer
