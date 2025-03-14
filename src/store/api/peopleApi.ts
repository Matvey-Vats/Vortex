import { baseApi } from './baseApi'

export const peopleApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getPeoplePopular: builder.query({
			query: (page = 1) => `person/popular?page=${page}`,
		}),
	}),
})

export const { useGetPeoplePopularQuery } = peopleApi
