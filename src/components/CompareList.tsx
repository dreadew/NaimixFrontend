import { CompareCandidatesTable } from './CompareCandidatesTable'
import { H2 } from './typography/h2'
import { Button } from './ui/button'

type Props = {
	candidates: {
		id: string
		name: string
		department: string
		position: string
		favorite: boolean
	}[]
}

export const CompareList = ({ candidates }: Props) => {
	return (
		<section className='w-full bg-white flex flex-col gap-6'>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10'>
				<H2>Сравнение кандидатов</H2>
				<Button variant={'secondary'}>Рассчитать совместимость</Button>
			</div>
			<CompareCandidatesTable candidates={candidates} />
		</section>
	)
}
