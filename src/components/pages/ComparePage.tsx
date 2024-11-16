import { CompareCandidatesTable } from '../CompareCandidatesTable'
import { DashboardWrapper } from '../DashboardWrapper'
import { H2 } from '../typography/h2'
import { Button } from '../ui/button'

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
			<section className='bg-white'>
				<div className='flex items-center justify-between gap-2'>
					<H2>Сравнение кандидатов</H2>
					<Button variant={'secondary'}>Рассчитать совместимость</Button>
				</div>
				<CompareCandidatesTable candidates={candidates} />
			</section>
		</DashboardWrapper>
	)
}
