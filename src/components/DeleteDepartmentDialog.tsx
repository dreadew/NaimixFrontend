import { X } from 'lucide-react'
import { DeleteDepartmentForm } from './forms/delete-department-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

type Props = {
	departmentId: string
}

export const DeleteDepartmentDialog = ({ departmentId }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className='ml-2 px-2 items-center justify-center py-0'
					variant={'ghost'}
				>
					<X className='h-4 w-4 text-muted-foreground' />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Удаление отдела</DialogTitle>
				<DeleteDepartmentForm departmentId={departmentId} />
			</DialogContent>
		</Dialog>
	)
}
