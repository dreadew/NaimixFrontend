import { axiosInstance } from '../api/axios'
import { Result } from '../types/result.types'
import { SkillsDto } from '../types/skills.types'
import {
	CandidateInfo,
	FavoritesDto,
	UpdateUserDto,
	UserInfoDto,
} from '../types/user.types'

class UserService {
	private URL = import.meta.env.VITE_USER_API_URL + '/user'

	async Update(dto: UpdateUserDto) {
		return axiosInstance.put<Result<UserInfoDto>>(this.URL + '/update', dto)
	}

	async GetUsersByRole(roleId: string, currentUserId: string) {
		return axiosInstance.get<Result<CandidateInfo[]>>(
			this.URL + `/roles/${roleId}?currentUserId=${currentUserId}`
		)
	}

	async GetMyProfile(id: string) {
		return axiosInstance.get<Result<UserInfoDto>>(this.URL + `/${id}`)
	}

	async AddUsersToFavorites(dto: FavoritesDto) {
		return axiosInstance.post<Result<UserInfoDto>>(
			this.URL + '/favorites/add',
			dto
		)
	}

	async DeleteUsersFromFavorites(dto: FavoritesDto) {
		return axiosInstance.post<Result<UserInfoDto>>(
			this.URL + '/favorites/delete',
			dto
		)
	}

	async AddSkills(dto: SkillsDto) {
		return axiosInstance.post<Result<boolean>>(this.URL + '/skills/add', dto)
	}

	async DeleteSkills(dto: SkillsDto) {
		return axiosInstance.post<Result<boolean>>(
			this.URL + '/skills/delete' + `?userId=${dto.userId}&title=${dto.title}`
		)
	}
}

export default new UserService()
