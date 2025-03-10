import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import auth from './slices/authSlice'
import genres from './slices/genresSlice'
import media from './slices/mediaSlice'
import search from './slices/searchSlice'

export const store = configureStore({
	reducer: {
		// tv,
		// movies,
		media,
		genres,
		search,
		auth,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
