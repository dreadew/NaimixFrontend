import { axiosInstance } from '../api/axios'
import { CreateUserDto, LoginUserDto, UserDto } from '../types/auth.types'
import { Result } from '../types/result.types'
import { TokenDto } from '../types/token.types'

class AuthService {
	private URL = import.meta.env.VITE_USER_API_URL + '/auth'

	async Login(data: LoginUserDto) {
		return axiosInstance.post<Result<TokenDto>>(this.URL + '/login', data)
	}

	async Register(data: CreateUserDto) {
		return axiosInstance.post<Result<UserDto>>(this.URL + '/register', data)
	}
}

export default new AuthService()
