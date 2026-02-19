export interface ApiResponse<T> {
	success: boolean
	message: string | string[]
	data: T
	meta: Meta
	error: Error
}

export interface Meta {
	method: string
	pagination?: Pagination
	path: string
	requestId: string
	status: number
	timestamp: Date
}

export interface Pagination {
	totalItems: number
	itemCount: number
	itemsPerPage: number
	totalPages: number
	currentPage: number
}

export interface Error {
	code: string
	statusCode: number
}
