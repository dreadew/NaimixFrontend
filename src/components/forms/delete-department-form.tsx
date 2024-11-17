import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isProblemDetailsError } from '../../lib/checkError'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

const formSchema = z.object({
	id: z.string(),
	departmentId: z.string(),
})

type Props = {
	departmentId: string
}

export const DeleteDepartmentForm = ({ departmentId }: Props) => {
	const { id } = useAuthStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: id!,
			departmentId: departmentId,
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await userService.DeleteDepartment({ id: values.departmentId })
			window.location.reload()
		} catch (err: unknown) {
			if (isProblemDetailsError(err)) {
				console.error(err.detail)
			}
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='max-w-[40rem] w-full flex flex-col gap-3'
			>
				<Button className='mt-2' disabled={isLoading} type='submit'>
					Удалить
				</Button>
			</form>
		</Form>
	)
}
