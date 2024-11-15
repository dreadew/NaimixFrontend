import { axiosInstance } from '../api/axios'
import { TokenDto } from '../types/token.types'
import { CreateUserDto, LoginUserDto, UserDto } from '../types/user.types'

class UserService {
	private URL = import.meta.env.VITE_USER_API_URL + '/user'

	async Login(data: LoginUserDto) {
		return axiosInstance.post<TokenDto>(this.URL, data)
	}

	async Register(data: CreateUserDto) {
		return axiosInstance.post<UserDto>(this.URL, data)
	}

	async Test() {
		return axiosInstance.get(this.URL)
	}
}

export default new UserService()
