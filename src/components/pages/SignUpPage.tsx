import { Container } from '../Container'
import { SignUpForm } from '../forms/sign-up-form'
import { H2 } from '../typography/h2'
import { Logo } from '../ui/logo'

export const SignUpPage = () => {
	return (
		<section className='h-screen w-full flex items-center justify-center'>
			<Container className='w-full items-center flex flex-col gap-6'>
				<Logo className='h-16 w-16 fill-primary' />
				<H2>Регистрация</H2>
				<SignUpForm />
			</Container>
		</section>
	)
}
