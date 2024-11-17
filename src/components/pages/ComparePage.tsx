import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { CompatibilityResult, GroupResult } from '../../types/natalCards.types'
import { CandidateInfo } from '../../types/user.types'
import { CompareCandidates } from '../CompareCandidates'
import { CompareList } from '../CompareList'
import { Container } from '../Container'
import { DashboardWrapper } from '../DashboardWrapper'

export const ComparePage = () => {
	const { id } = useAuthStore()
	const [results, setResults] = useState<CompatibilityResult>()
	const [groupCompatibility, setGroupCompatibility] = useState<GroupResult>()
	const [candidates, setCandidates] = useState<CandidateInfo[]>([])
	const [toCompare, setToCompare] = useState<{
		person1: number
		person2: number
	}>({
		person1: 0,
		person2: 1,
	})

	useEffect(() => {
		const fetchCandidates = async () => {
			try {
				const { data } = await userService.GetFavoriteUsers(id!)
				setCandidates(data.data)
			} catch (err: unknown) {
				console.error(err)
			}
		}
		fetchCandidates()
	}, [])

	const changeGroupCompatibility = (res: GroupResult) => {
		setGroupCompatibility(res)
	}

	const changeResults = (res: CompatibilityResult) => {
		setResults(res)
	}

	const changeCandidate = (person: number, idx: number) => {
		if (person == 1) {
			setToCompare({ ...toCompare, person1: idx })
		} else {
			setToCompare({ ...toCompare, person2: idx })
		}
	}

	return (
		<DashboardWrapper className='w-full flex flex-col gap-6'>
			<Container className={cn('h-full w-full bg-white rounded-3xl')}>
				<CompareList
					onChange={changeGroupCompatibility}
					candidates={candidates}
				/>
			</Container>
			<Container className={cn('h-full w-full bg-white rounded-3xl')}>
				<CompareCandidates
					groupCompatibility={groupCompatibility}
					onCandidateChange={changeCandidate}
					toCompare={toCompare}
					onCompare={changeResults}
					results={results}
					candidates={candidates}
				/>
			</Container>
		</DashboardWrapper>
	)
}
