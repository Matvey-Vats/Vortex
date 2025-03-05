import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN

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
			query: (page = 1) => `discover/movie?page=${page}`,
		}),
		getTVShowsList: builder.query({
			query: (page = 1) => `discover/tv?page=${page}`,
		}),
		getPopularMovies: builder.query({
			query: (page = 1) => `movie/popular?page=${page}`,
		}),
		getTopRated: builder.query({
			query: ({ type = 'movie', page = 1 }) => `${type}/top_rated?page=${page}`,
		}),
		getShowsByProperty: builder.query({
			query: ({ property = '', page = 1 }) => `tv/${property}?page=${page}`,
		}),
		getPeoplePopular: builder.query({
			query: (page = 1) => `person/popular?page=${page}`,
		}),
	}),
})

export const {
	useGetMovieListQuery,
	useGetTVShowsListQuery,
	useGetPopularMoviesQuery,
	useGetTopRatedQuery,
	useGetShowsByPropertyQuery,
	useGetPeoplePopularQuery,
} = apiSlice
