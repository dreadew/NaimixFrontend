import { CandidateInfo } from '../types/user.types'
import { FavoriteCandidateIcon } from './FavoriteCandidateIcon'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

type Props = {
	candidates: CandidateInfo[]
}

export const CompareCandidatesTable = ({ candidates }: Props) => {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[2rem]'></TableHead>
						<TableHead>ФИО</TableHead>
						<TableHead>Отдел</TableHead>
						<TableHead>Должность</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{candidates.map((item, idx) => (
						<TableRow className='h-14' key={`candidate-${idx}`}>
							<TableCell>
								<span className='flex items-center'>
									<FavoriteCandidateIcon isFavorite={item.isFavorite} />
								</span>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.department ?? 'Не указан'}</TableCell>
							<TableCell>{item.position ?? 'Не указана'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
