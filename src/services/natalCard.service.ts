import { axiosInstance } from '../api/axios'
import {
	CompatibilityResult,
	DepartmentCompatibilityRequest,
	GroupResult,
	TwoPeopleCompatibilityRequest,
} from '../types/natalCards.types'
import { Result } from '../types/result.types'

class NatalCardService {
	private URL = import.meta.env.VITE_NATAL_CARD_API_URL

	async GetCompatibilityForTwo(dto: TwoPeopleCompatibilityRequest) {
		return axiosInstance.post<Result<CompatibilityResult>>(
			this.URL + '/cosmostat/two-people',
			dto
		)
	}

	async GetCompatibilityForDepartment(dto: DepartmentCompatibilityRequest) {
		return axiosInstance.post<Result<GroupResult>>(
			this.URL + '/cosmostat/department',
			dto
		)
	}
}

export default new NatalCardService()
