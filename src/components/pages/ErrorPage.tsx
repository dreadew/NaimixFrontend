import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Container } from '../Container'
import { Code } from '../typography/code'
import { H1 } from '../typography/h1'
import { P } from '../typography/p'

export const ErrorPage = () => {
	const error = useRouteError()
	console.error(error)

	return (
		<section className='h-screen w-full flex items-center justify-center'>
			<Container className='flex flex-col items-center gap-4'>
				<H1>Упс!</H1>
				<P>Произошла ошибка.</P>
				<Code className='font-sans px-2 py-2 text-md bg-primary text-background'>
					{isRouteErrorResponse(error)
						? error.statusText
						: error instanceof Error
						? error.message
						: 'Неизвестная ошибка'}
				</Code>
			</Container>
		</section>
	)
}
