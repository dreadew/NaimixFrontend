import { Info } from 'lucide-react'
import { Recommendations } from '../constants/recommendations'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

export const RecommendationsDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'link'} className='p-0 text-secondary'>
					<Info />
					<span className='ml-2'>Инструкция по прочтению аналитики</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Инструкция по прочтению аналитики</DialogTitle>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='min-w-[10rem]'>Баллы</TableHead>
							<TableHead>Уровень совместимости</TableHead>
							<TableHead>Описание</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Recommendations.map((item, idx) => (
							<TableRow key={`recommendations-table-row-${idx}`}>
								<TableCell>
									от {item.fromScore} до {item.toScore}
								</TableCell>
								<TableCell>{item.level}</TableCell>
								<TableCell>{item.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	)
}
