import { cn } from '../../lib/utils'
import { CompareCandidates } from '../CompareCandidates'
import { CompareList } from '../CompareList'
import { Container } from '../Container'
import { DashboardWrapper } from '../DashboardWrapper'

export const ComparePage = () => {
	const candidates = [
		{
			id: '0',
			name: 'Иванов И.И.',
			department: 'Отдел',
			position: 'Должность',
			favorite: true,
		},
		{
			id: '1',
			name: 'Иванов И.И.',
			department: 'Отдел',
			position: 'Должность',
			favorite: true,
		},
	]
	return (
		<DashboardWrapper className='w-full flex flex-col gap-6'>
			<Container className={cn('h-full w-full bg-white rounded-3xl')}>
				<CompareList candidates={candidates} />
			</Container>
			<Container className={cn('h-full w-full bg-white rounded-3xl')}>
				<CompareCandidates candidates={candidates} />
			</Container>
		</DashboardWrapper>
	)
}
