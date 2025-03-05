import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum ListType {
	POPULAR = 'popular',
	TOP = 'top_rated',
}

export interface IValue {
	id: number
	value: string
	property: string
}
export interface TVState {
	value: IValue
}

const initialState: TVState = {
	value: {
		id: 1,
		value: 'Popular',
		property: 'popular',
	},
}

export const tvSlice = createSlice({
	name: 'tv',
	initialState,
	reducers: {
		setValue(state, action: PayloadAction<IValue>) {
			state.value = action.payload
		},
	},
})

export const { setValue } = tvSlice.actions

export default tvSlice.reducer
