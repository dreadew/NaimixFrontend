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
	candidates: {
		id: string
		name: string
		department: string
		position: string
		favorite: boolean
	}[]
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
									<FavoriteCandidateIcon isFavorite={item.favorite} />
								</span>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.department}</TableCell>
							<TableCell>{item.position}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
