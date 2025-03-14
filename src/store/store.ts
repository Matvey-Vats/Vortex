import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { commonApi } from './api/commonApi'
import { moviesApi } from './api/moviesApi'
import { peopleApi } from './api/peopleApi'
import { tvShowsApi } from './api/tvShowsApi'
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
		[baseApi.reducerPath]: baseApi.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			baseApi.middleware,
			moviesApi.middleware,
			tvShowsApi.middleware,
			peopleApi.middleware,
			commonApi.middleware,
		]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
