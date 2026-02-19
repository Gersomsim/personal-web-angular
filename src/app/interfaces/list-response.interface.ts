import { Pagination } from '@shared/models/api-response.model'

export interface ListResponse<T> {
	items: T[]
	pagination: Pagination
}
