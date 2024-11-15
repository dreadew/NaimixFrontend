import { Container } from '../Container'
import { SignUpForm } from '../forms/sign-up-form'
import { H2 } from '../typography/h2'

export const SignUpPage = () => {
	return (
		<section className='h-screen w-full flex items-center justify-center'>
			<Container className='w-full items-center flex flex-col gap-6'>
				<H2>Регистрация</H2>
				<SignUpForm />
			</Container>
		</section>
	)
}
