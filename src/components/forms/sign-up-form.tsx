import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { SignInPageLink } from '../../constants/links'
import { cn } from '../../lib/utils'
import authService from '../../services/auth.service'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input, PasswordInput } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { RadioGroup, RadioGroupItem } from '../ui/radioGroup'

const formSchema = z.object({
	name: z.string().min(2, { message: 'Длина имени должна быть >= 2 символов' }),
	surname: z
		.string()
		.min(2, { message: 'Длина фамилии должна быть >= 2 символов' }),
	patronymic: z.string(),
	dateBirth: z.date(),
	phoneNumber: z
		.string()
		.min(11, { message: 'Длина номера телефона должна быть ровно 11 символов' })
		.max(11, {
			message: 'Длина номера телефона должна быть ровно 11 символов',
		}),
	telegramLink: z.string().min(1, { message: 'Некорретная ссылка' }),
	roleId: z.string().min(1).max(1),
	positionId: z.string(),
	password: z
		.string()
		.min(4, { message: 'Длина пароля должна быть >= 4 символов' })
		.max(16, { message: 'Длина пароля должна быть <= 16 символов' }),
})

export const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			surname: '',
			patronymic: '',
			dateBirth: new Date(),
			phoneNumber: '',
			telegramLink: '',
			roleId: '1',
			positionId: '',
			password: '',
		},
	})
	const navigate = useNavigate()

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await authService.Register({
				...values,
				dateBirth: values.dateBirth.toJSON().split('T')[0],
			})
			navigate(SignInPageLink)
		} catch (err: unknown) {
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
					<div className='flex items-center gap-2'>
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
					</div>
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
					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Номер телефона</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										autoFocus
										error={form.formState.errors?.phoneNumber?.message}
										placeholder='Номер телефона'
										maxLength={11}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='roleId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Выберите свою роль</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<div className='flex items-center gap-2'>
											<FormItem className='w-full flex items-center gap-4 p-3 rounded-xl border border-accent'>
												<FormControl>
													<RadioGroupItem value='1' />
												</FormControl>
												<div className='flex flex-col gap-1'>
													<FormLabel>Рекрутер</FormLabel>
													<FormDescription>
														Описание роли рекрутера...
													</FormDescription>
												</div>
											</FormItem>
											<FormItem className='w-full flex items-center gap-4 p-3 rounded-xl border border-accent'>
												<FormControl>
													<RadioGroupItem value='2' />
												</FormControl>
												<div className='flex flex-col gap-1'>
													<FormLabel>Работник</FormLabel>
													<FormDescription>
														Описание роли работника...
													</FormDescription>
												</div>
											</FormItem>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center justify-between'>
									<FormLabel>Пароль</FormLabel>
								</div>
								<FormControl>
									<PasswordInput
										disabled={isLoading}
										error={form.formState.errors?.password?.message}
										type='password'
										placeholder='******'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button disabled={isLoading} type='submit'>
					Зарегистрироваться
				</Button>
				<span className='flex gap-1 text-sm text-muted-foreground self-center'>
					Уже есть аккаунт?{' '}
					<Link className='font-medium text-primary' to={SignInPageLink}>
						Войти
					</Link>
				</span>
			</form>
		</Form>
	)
}
