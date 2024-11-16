export type UserDto = {
	id: string
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
	roleId: string
	dateBirth: string
	telegramLink: string
	password: string
	positionId?: string
}
