import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { CandidateInfo } from '../../types/user.types'
import { CandidatesTable } from '../CandidatesTable'
import { Container } from '../Container'
import { DashboardWrapper } from '../DashboardWrapper'

export const CandidatePage = () => {
	const { id } = useAuthStore()
	const [candidates, setCandidates] = useState<CandidateInfo[]>()

	useEffect(() => {
		const fetchCandidates = async () => {
			try {
				const { data } = await userService.GetUsersByRole('2', id!)
				const info = data.data
				console.log(data)
				info.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite))
				setCandidates(info)
			} catch (err: unknown) {
				console.error(err)
			}
		}
		fetchCandidates()
	}, [])

	return (
		<DashboardWrapper className='flex-col gap-6 h-[calc(100vh_-_3rem)]'>
			<Container
				className={cn('h-full w-full bg-white rounded-3xl flex flex-col gap-6')}
			>
				<CandidatesTable candidates={candidates ?? []} />
			</Container>
		</DashboardWrapper>
	)
}
