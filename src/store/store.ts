import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import movies from './slices/moviesSlice'
import tv from './slices/tvSlice'

export const store = configureStore({
	reducer: {
		tv,
		movies,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
