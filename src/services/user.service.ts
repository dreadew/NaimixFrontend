import { axiosInstance } from '../api/axios'
import {
	CreateDepartmentDto,
	CreateDepartmentResponseDto,
	DeleteDepartmentDto,
	DepartmentDto,
	UpdateDepartmentDto,
} from '../types/department.types'
import {
	CreatePositionDto,
	CreatePositionResponseDto,
	DeletePositionDto,
	PositionDto,
	UpdatePositionDto,
} from '../types/position.types'
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

	async GetFavoriteUsers(currentUserId: string) {
		return axiosInstance.get<Result<CandidateInfo[]>>(
			this.URL + `/favorites?currentUserId=${currentUserId}`
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

	async CreateDepartment(dto: CreateDepartmentDto) {
		return axiosInstance.post<Result<CreateDepartmentResponseDto>>(
			this.URL + '/departments/add',
			dto
		)
	}

	async GetAllDepartments() {
		return axiosInstance.get<Result<DepartmentDto[]>>(this.URL + '/departments')
	}

	async UpdateDepartment(dto: UpdateDepartmentDto) {
		return axiosInstance.patch<Result<boolean>>(
			this.URL + '/departments/update',
			dto
		)
	}

	async DeleteDepartment(dto: DeleteDepartmentDto) {
		return axiosInstance.delete<Result<boolean>>(
			this.URL + `/departments/delete?id=${dto.id}`
		)
	}

	async CreatePosition(dto: CreatePositionDto) {
		return axiosInstance.post<Result<CreatePositionResponseDto>>(
			this.URL + '/positions/add',
			dto
		)
	}

	async GetAllPositions() {
		return axiosInstance.get<Result<PositionDto[]>>(this.URL + `/positions/all`)
	}

	async GetAllPositionsByDepartment(departmentId: string) {
		return axiosInstance.get<Result<PositionDto[]>>(
			this.URL + `/positions?id=${departmentId}`
		)
	}

	async UpdatePosition(dto: UpdatePositionDto) {
		return axiosInstance.patch<Result<boolean>>(
			this.URL + '/positions/update',
			dto
		)
	}

	async DeletePosition(dto: DeletePositionDto) {
		return axiosInstance.delete<Result<boolean>>(
			this.URL + `/positions/delete?id=${dto.id}`
		)
	}
}

export default new UserService()
