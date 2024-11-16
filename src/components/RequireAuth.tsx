import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { SignInPageLink } from '../constants/links'
import { useAuthStore } from '../stores/authStore'

type Props = {
	children: React.ReactNode
}

function RequireAuth({ children }: Props) {
	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
	const { checkAuthorization } = useAuthStore()

	useEffect(() => {
		const getAuthorizationStatus = async () => {
			const result = await checkAuthorization()
			setIsAuthorized(result)
		}

		getAuthorizationStatus()
	}, [])

	if (isAuthorized === null) {
		return
	}

	return isAuthorized ? children : <Navigate to={SignInPageLink} replace />
}

export { RequireAuth }
