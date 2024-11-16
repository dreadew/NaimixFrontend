import { UpdateUserInfoForm } from './forms/update-user-info-form'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'

export const UpdateUserInfoDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'link'} className='p-0 w-max text-secondary'>
					Изменить данные
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Обновление акккаунта</DialogTitle>
				<UpdateUserInfoForm />
			</DialogContent>
		</Dialog>
	)
}
