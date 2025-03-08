import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import genres from './slices/genresSlice'
import movies from './slices/moviesSlice'
import search from './slices/searchSlice'
import tv from './slices/tvSlice'

export const store = configureStore({
	reducer: {
		tv,
		movies,
		genres,
		search,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
