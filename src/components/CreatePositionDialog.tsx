import { CreatePositionForm } from './forms/create-position-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export const CreatePositionDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'secondary'}>Создать должности</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Создание должности</DialogTitle>
				<CreatePositionForm />
			</DialogContent>
		</Dialog>
	)
}
