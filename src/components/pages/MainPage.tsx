import { Container } from '../Container'
import { H1 } from '../typography/h1'
import { P } from '../typography/p'
import { Button } from '../ui/button'

export const MainPage = () => {
	return (
		<section className='h-screen w-full flex items-center'>
			<Container>
				<div className='flex flex-col gap-4'>
					<H1>Космограмма</H1>
					<P>описание</P>
					<div className='flex gap-2'>
						<Button>Попробовать</Button>
						<Button variant={'outline'}>Войти в аккаунт</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}
