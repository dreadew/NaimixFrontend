import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { AccessTokenCookie, RefreshTokenCookie } from '../../constants/cookies'
import { SignUpPageLink } from '../../constants/links'
import { isProblemDetailsError } from '../../lib/checkError'
import { SetCookie } from '../../services/cookies.service'
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
import { PasswordInput, PhoneInput } from '../ui/input'

const formSchema = z.object({
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

export const SignInForm = () => {
	const { login } = useAuthStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phoneNumber: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			const { data } = await userService.Login(values)

			SetCookie(AccessTokenCookie, data.accessToken)
			SetCookie(RefreshTokenCookie, data.refreshToken)
			login(data)
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
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Номер телефона</FormLabel>
								<FormControl>
									<PhoneInput
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
					Войти в аккаунт
				</Button>
				<span className='flex gap-1 text-sm text-muted-foreground self-center'>
					Еще нет аккаунта?{' '}
					<Link className='font-medium text-primary' to={SignUpPageLink}>
						Зарегистрироваться
					</Link>
				</span>
			</form>
		</Form>
	)
}
