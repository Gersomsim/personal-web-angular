import { User } from '@features/users/models'

export interface LoginResponseDto {
	user: User
	token: string
}
