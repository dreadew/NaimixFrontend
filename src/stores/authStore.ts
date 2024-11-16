import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthError } from '../errors/AuthError'
import {
	DecodeToken,
	GetAccessToken,
	RemoveAccessToken,
	RemoveRefreshToken,
	ValidateToken,
} from '../services/cookies.service'

interface IAuthState {
	accessToken: string | null
	refreshToken: string | null
	id: string | null
	name: string | null
	roleId: string | null
	login: (val: { accessToken: string; refreshToken: string }) => void
	logout: () => void
	checkAuthorization: () => Promise<boolean>
}

const useAuthStore = create<IAuthState>()(
	persist(
		set => ({
			accessToken: null,
			refreshToken: null,
			id: null,
			name: null,
			roleId: null,
			login: async val => {
				const decodedToken = await DecodeToken(val.accessToken)
				set(() => ({
					id: decodedToken?.id,
					name: decodedToken?.name,
					roleId: decodedToken?.roleId,
					accessToken: val.accessToken,
					refreshToken: val.refreshToken,
				}))
			},
			logout: () => {
				set(() => ({
					id: null,
					name: null,
					roleId: null,
					accessToken: null,
					refreshToken: null,
				}))

				RemoveAccessToken()
				RemoveRefreshToken()
			},
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
