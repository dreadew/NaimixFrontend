import natalCardService from '../services/natalCard.service'
import { GroupResult, PersonInfo } from '../types/natalCards.types'
import { CandidateInfo } from '../types/user.types'
import { CompareCandidatesTable } from './CompareCandidatesTable'
import { H2 } from './typography/h2'
import { Button } from './ui/button'

type Props = {
	candidates: CandidateInfo[]
	onChange: (res: GroupResult) => void
}

export const CompareList = ({ onChange, candidates }: Props) => {
	const handleClick = async () => {
		try {
			const dto: PersonInfo[] = []

			for (let i = 0; i < candidates.length; i++) {
				dto.push({
					full_name:
						candidates[i].surname +
						' ' +
						candidates[i].name +
						' ' +
						candidates[i].patronymic,
					birth_date: candidates[i].dateBirth,
				})
			}

			const { data } = await natalCardService.GetCompatibilityForDepartment({
				people: dto,
			})

			console.log(data)

			onChange(data.data)
		} catch (err: unknown) {
			console.error(err)
		}
	}

	return (
		<section className='w-full bg-white flex flex-col gap-6'>
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10'>
				<H2>Сравнение кандидатов</H2>
				<Button onClick={handleClick} variant={'secondary'}>
					Рассчитать совместимость
				</Button>
			</div>
			<CompareCandidatesTable candidates={candidates} />
		</section>
	)
}
