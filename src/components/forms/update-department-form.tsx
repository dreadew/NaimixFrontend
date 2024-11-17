import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isProblemDetailsError } from '../../lib/checkError'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { PhoneInput } from '../ui/input'

const formSchema = z.object({
	id: z.string(),
	departmentId: z.string(),
	title: z.string(),
})

type Props = {
	departmentId: string
}

export const UpdateDepartmentForm = ({ departmentId }: Props) => {
	const { id } = useAuthStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: id!,
			departmentId: departmentId,
			title: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await userService.UpdateDepartment({
				id: values.departmentId,
				title: values.title,
			})
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
				<div className='flex flex-col gap-2'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Название должности</FormLabel>
								<FormControl>
									<PhoneInput
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.title?.message}
										placeholder='Название должности'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='mt-2' disabled={isLoading} type='submit'>
					Создать
				</Button>
			</form>
		</Form>
	)
}
