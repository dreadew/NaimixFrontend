import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import {
	GetAccessToken,
	RemoveAccessToken,
	RemoveRefreshToken,
	ValidateToken,
} from '../services/cookies.service'
import { ApiError, ProblemDetailsError } from '../types/error.types'

const options: CreateAxiosDefaults = {
	headers: {
		'Content-Type': 'application/json',
	},
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(
	async config => {
		const accessToken = GetAccessToken()

		if (accessToken) {
			const accessTokenIsValid = await ValidateToken(accessToken)
			if (!accessTokenIsValid) {
				RemoveAccessToken()
				RemoveRefreshToken()
				throw new Error('Некорректный Access Token')
			}

			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
	response => response,
	async error => {
		if (error instanceof AxiosError) {
			if (error.response) {
				const { data, status } = error.response

				if (data) {
					if (data.type && data.title && data.status) {
						const errorData: ProblemDetailsError = {
							type: data.type,
							title: data.title,
							status: status,
							detail: data.detail || 'Подробности не указаны',
							instance: data.instance || 'Нет информации об экземпляре',
						}
						return Promise.reject(errorData)
					} else {
						const errorData: ApiError = {
							message: error.message,
							cause: error.cause?.message || 'Неизвестная причина',
							code: error.status || -1,
						}
						return Promise.reject(errorData)
					}
				}
			}
		}
		return Promise.reject(error)
	}
)

export { axiosInstance }
