import { Pencil } from 'lucide-react'
import { UpdateDepartmentForm } from './forms/update-department-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

type Props = {
	departmentId: string
}

export const UpdateDepartmentDialog = ({ departmentId }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='ml-2 px-2 items-center justify-center py-0'
					variant={'ghost'}
				>
					<Pencil className='h-4 w-4 text-muted-foreground' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Редактирование отдела</DialogTitle>
				<UpdateDepartmentForm departmentId={departmentId} />
			</DialogContent>
		</Dialog>
	)
}
