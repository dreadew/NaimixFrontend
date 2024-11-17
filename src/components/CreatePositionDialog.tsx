import { DepartmentDto } from '../types/department.types'
import { CreatePositionForm } from './forms/create-position-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

type Props = {
	departments: DepartmentDto[] | null
}

export const CreatePositionDialog = ({ departments }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'}>Создать должности</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Создание должности</DialogTitle>
				<CreatePositionForm departments={departments} />
			</DialogContent>
		</Dialog>
	)
}
