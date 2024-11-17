import { CreateDepartmentForm } from './forms/create-department-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export const CreateDepartmentDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'}>Создать отдел</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Создание отдела</DialogTitle>
				<CreateDepartmentForm />
			</DialogContent>
		</Dialog>
	)
}
