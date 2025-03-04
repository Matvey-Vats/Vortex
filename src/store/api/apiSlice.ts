import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN
console.log('KEY', API_KEY)

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.themoviedb.org/3/',
		prepareHeaders: headers => {
			headers.set('Authorization', `Bearer ${API_KEY}`)
			headers.set('accept', 'application/json')
			return headers
		},
	}),

	endpoints: builder => ({
		getMovieList: builder.query({
			query: () => 'discover/movie',
		}),
	}),
})

export const { useGetMovieListQuery } = apiSlice
