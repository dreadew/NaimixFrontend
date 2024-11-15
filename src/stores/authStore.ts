import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthError } from '../errors/AuthError'
import { GetAccessToken, ValidateToken } from '../services/cookies.service'

interface IAuthState {
	accessToken: string | null
	refreshToken: string | null
	login: (val: { accessToken: string; refreshToken: string }) => void
	logout: () => void
	checkAuthorization: () => Promise<boolean>
}

const useAuthStore = create<IAuthState>()(
	persist(
		set => ({
			accessToken: null,
			refreshToken: null,
			login: val =>
				set(() => ({
					accessToken: val.accessToken,
					refreshToken: val.refreshToken,
				})),
			logout: () =>
				set(() => ({
					accessToken: null,
					refreshToken: null,
				})),
			checkAuthorization: async () => {
				try {
					const accessToken = GetAccessToken()

					if (!accessToken) {
						throw new AuthError('Не найден Access Token')
					}

					const isAccessTokenValid = ValidateToken(accessToken)
					return isAccessTokenValid
				} catch (err: unknown) {
					if (err instanceof AuthError) {
						console.error(err)
					}
					return false
				}
			},
		}),
		{ name: 'authStore' }
	)
)

export { useAuthStore }
