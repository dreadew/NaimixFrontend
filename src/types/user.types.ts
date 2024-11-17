export type UserInfoDto = {
	id: string
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	aboutMe: string
	dateBirth: string
	telegramLink: string
	role: string
	skills: SkillsInfoDto[]
	position: string
	department: string
}

export type CandidateInfo = {
	id: string
	name: string
	surname: string
	patronymic: string
	dateBirth: string
	isFavorite: boolean
	position: string | null
	department: string | null
}

export type SkillsInfoDto = {
	id: string
	title: string
}

export type UpdateUserDto = {
	id: string
	name?: string
	surname?: string
	patronymic?: string
	dateBirth?: string
	telegramLink?: string
	positionId?: string
	aboutMe?: string
}

export type FavoritesDto = {
	mainUserId: string
	favoriteUsersIds: string[]
}
