import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { SignInPageLink } from '../../constants/links'
import userService from '../../services/user.service'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input, PasswordInput } from '../ui/input'

const formSchema = z.object({
	name: z.string().min(2, { message: 'Длина имени должна быть >= 2 символов' }),
	surname: z
		.string()
		.min(2, { message: 'Длина фамилии должна быть >= 2 символов' }),
	patronymic: z.string(),
	phoneNumber: z
		.string()
		.min(11, { message: 'Длина номера телефона должна быть ровно 11 символов' })
		.max(11, {
			message: 'Длина номера телефона должна быть ровно 11 символов',
		}),
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
			phoneNumber: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await userService.Register(values)
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
										{...field}
									/>
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
