import { QueryDto } from '@shared/dto'

export interface QueryTagDto extends QueryDto {
	type?: 'blog' | 'project'
}
