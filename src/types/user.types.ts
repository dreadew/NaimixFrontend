export type UserDto = {
	id: string
}

export type UserInfoDto = {
	id: string
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	role: string
}

export type LoginUserDto = {
	phoneNumber: string
	password: string
}

export type CreateUserDto = {
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	password: string
}
