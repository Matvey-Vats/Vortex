import { baseApi } from './baseApi'

export const tvShowsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getTVShowsList: builder.query({
			query: (page = 1) => `discover/tv?page=${page}`,
		}),
		getShowsByProperty: builder.query({
			query: ({ property = 'popular', page = 1 }) =>
				`tv/${property}?page=${page}`,
		}),
		getTopRatedShows: builder.query({
			query: (page = 1) => `tv/top_rated?page=${page}`,
		}),
		getTVShowById: builder.query({
			query: (id: number) => `tv/${id}`,
		}),
		getSimilarShows: builder.query({
			query: (id: number) => `tv/${id}/similar`,
		}),
	}),
})

export const {
	useGetTVShowsListQuery,
	useGetShowsByPropertyQuery,
	useGetTopRatedShowsQuery,
	useGetTVShowByIdQuery,
	useGetSimilarShowsQuery,
} = tvShowsApi
