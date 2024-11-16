import { CandidatesTable } from '../CandidatesTable'
import { DashboardWrapper } from '../DashboardWrapper'

export const CandidatePage = () => {
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
		{
			id: '2',
			name: 'Иванов И.И.',
			department: 'Отдел',
			position: 'Должность',
			favorite: false,
		},
		{
			id: '3',
			name: 'Иванов И.И.',
			department: 'Отдел',
			position: 'Должность',
			favorite: false,
		},
	]
	return (
		<DashboardWrapper className='flex-col gap-6'>
			<CandidatesTable candidates={candidates} />
		</DashboardWrapper>
	)
}
