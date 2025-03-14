import { baseApi } from './baseApi'

export const commonApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getByTypeAndProperty: builder.query({
			query: ({ type = 'movie', property = 'popular', page = 1 }) =>
				`${type}/${property}?page=${page}`,
		}),
		getByTypeAndId: builder.query({
			query: ({ type = 'movie', id = 1 }) => `${type}/${id}`,
		}),
	}),
})

export const { useGetByTypeAndPropertyQuery, useGetByTypeAndIdQuery } =
	commonApi
