import { useEffect, useState } from 'react'
import { useAuthStore } from '../../stores/authStore'

export const TestPage = () => {
	const [authorized, setAuthorized] = useState<boolean>()
	const { checkAuthorization } = useAuthStore()
	useEffect(() => {
		const fetchAuthorization = async () => {
			setAuthorized(await checkAuthorization())
		}
		fetchAuthorization()
		console.log(authorized)
	}, [authorized])
	return <div>123</div>
}
