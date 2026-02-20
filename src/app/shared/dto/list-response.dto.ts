import { Pagination } from '@shared/dto/api-response.dto'

export interface ListResponse<T> {
	items: T[]
	pagination: Pagination
}
