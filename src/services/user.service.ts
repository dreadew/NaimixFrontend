import { axiosInstance } from '../api/axios'
import { FavoritesDto, UserInfoDto } from '../types/user.types'

class UserService {
	private URL = import.meta.env.VITE_USER_API_URL + '/user'

	async GetUsersByRole(roleId: string) {
		return axiosInstance.get<UserInfoDto[]>(this.URL + `/roles/${roleId}`)
	}

	async GetMyProfile(id: string) {
		return axiosInstance.get<UserInfoDto>(this.URL + `/${id}`)
	}

	async AddUsersToFavorites(dto: FavoritesDto) {
		return axiosInstance.get<UserInfoDto>(
			this.URL +
				'/favorites/add' +
				`?mainUserId=${dto.mainUserId}` +
				`&favoritesUsersIds=${dto.favoriteUsersIds}`
		)
	}

	async DeleteUsersFromFavorites(dto: FavoritesDto) {
		return axiosInstance.get<UserInfoDto>(
			this.URL +
				'/favorites/delete' +
				`?mainUserId=${dto.mainUserId}` +
				`&favoritesUsersIds=${dto.favoriteUsersIds}`
		)
	}
}

export default new UserService()
