import { zodResolver } from '@hookform/resolvers/zod'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isProblemDetailsError } from '../../lib/checkError'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
	id: z.string(),
	name: z.string().min(2, { message: 'Длина имени должна быть >= 2 символов' }),
	surname: z
		.string()
		.min(2, { message: 'Длина фамилии должна быть >= 2 символов' }),
	patronymic: z.string(),
	dateBirth: z.date(),
	telegramLink: z.string().min(1, { message: 'Некорретная ссылка' }),
})

export const UpdateUserInfoForm = () => {
	const { id } = useAuthStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: id!,
			name: '',
			surname: '',
			patronymic: '',
			dateBirth: new Date(),
			telegramLink: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await userService.Update({
				...values,
				dateBirth: values.dateBirth.toJSON().split('T')[0],
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
						name='name'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.name?.message}
										placeholder='Имя'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='surname'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Фамилия</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.surname?.message}
										placeholder='Фамилия'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='patronymic'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Отчество</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.patronymic?.message}
										placeholder='Отчество'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dateBirth'
						render={({ field }) => (
							<FormItem className='mt-1 flex flex-col'>
								<FormLabel>Дата рождения</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'justify-start pl-3 text-left font-normal active:scale-100 gap-3',
													!field.value && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className='h-4 w-4 opacity-50' />
												{field.value ? (
													format(field.value, 'PPP')
												) : (
													<span>Выберите дату</span>
												)}
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent align='start' className='w-auto p-0'>
										<Calendar
											mode='single'
											selected={new Date(field.value)}
											onSelect={field.onChange}
											disabled={date =>
												date > new Date() || date < new Date('1900-01-01')
											}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='telegramLink'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Никнейм в telegram</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.telegramLink?.message}
										placeholder='Никнейм в telegram'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='mt-2' disabled={isLoading} type='submit'>
					Обновить
				</Button>
			</form>
		</Form>
	)
}
