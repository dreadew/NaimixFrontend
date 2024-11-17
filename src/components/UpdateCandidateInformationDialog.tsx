import { UpdateCandidateInformationForm } from './forms/update-candidate-information-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export const UpdateCandidateInformationDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'link'} className='p-0 w-max text-secondary'>
					Изменить данные кандидата
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Обновление акккаунта</DialogTitle>
				<UpdateCandidateInformationForm />
			</DialogContent>
		</Dialog>
	)
}
