import { Container } from '../Container'
import { SignInForm } from '../forms/sign-in-form'
import { H2 } from '../typography/h2'

export const SignInPage = () => {
	return (
		<section className='h-screen w-full flex items-center justify-center'>
			<Container className='w-full items-center flex flex-col gap-6'>
				<H2>Вход в аккаунт</H2>
				<SignInForm />
			</Container>
		</section>
	)
}