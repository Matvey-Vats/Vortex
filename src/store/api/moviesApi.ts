import { baseApi } from './baseApi'

export const moviesApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getMovieList: builder.query({
			query: (page = 1) => `discover/movie?page=${page}`,
		}),
		getMoviesByProperty: builder.query({
			query: ({ property = 'popular', page = 1 }) =>
				`movie/${property}?page=${page}`,
		}),
		getTopRatedMovies: builder.query({
			query: (page = 1) => `movie/top_rated?page=${page}`,
		}),
		getMovieById: builder.query({
			query: (id: number) => `movie/${id}`,
		}),
		getVideosById: builder.query({
			query: (id: number) => `movie/${id}/videos`,
		}),
		getSimilarMovies: builder.query({
			query: (id: number) => `movie/${id}/similar`,
		}),
	}),
})

export const {
	useGetMovieListQuery,
	useGetMoviesByPropertyQuery,
	useGetTopRatedMoviesQuery,
	useGetMovieByIdQuery,
	useGetVideosByIdQuery,
	useGetSimilarMoviesQuery,
} = moviesApi
