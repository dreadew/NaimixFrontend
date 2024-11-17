import { Pencil } from 'lucide-react'
import { UpdatePositionForm } from './forms/update-position-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

type Props = {
	positionId: string
}

export const UpdatePositionDialog = ({ positionId }: Props) => {
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
				<DialogTitle>Редактирование должность</DialogTitle>
				<UpdatePositionForm positionId={positionId} />
			</DialogContent>
		</Dialog>
	)
}
