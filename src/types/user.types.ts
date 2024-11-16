export type UserInfoDto = {
	id: string
	name: string
	surname: string
	patronymic: string
	phoneNumber: string
	role: string
}

export type FavoritesDto = {
	mainUserId: string
	favoriteUsersIds: string[]
}
