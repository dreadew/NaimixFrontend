import { DashboardWrapper } from '../DashboardWrapper'
import { H4 } from '../typography/h4'
import { P } from '../typography/p'
import { Avatar } from '../ui/avatar'

export const AboutPage = () => {
	return (
		<DashboardWrapper className='flex flex-col gap-12'>
			<div className='flex items-center gap-4'>
				<Avatar />
				<div className='flex flex-col'>
					<H4>Иванов Иван Иванович</H4>
					<P>Россия, Казань</P>
				</div>
			</div>

			<AboutInfo
				dateBirth='14.12.2004'
				age='19 лет'
				department='Маркетинг'
				position='Маркетолог'
			/>

			<AboutMe
				text='Опытный профессионал с многолетним стажем в своей области, обладающий
					сильными аналитическими и коммуникативными навыками. Успешно
					реализовал несколько проектов, направленных на улучшение процессов и
					повышение эффективности работы команды. Имеет опыт работы в динамичных
					условиях и стремится к постоянному развитию, обучению и внедрению
					инновационных решений.'
			/>

			<AboutSkills
				skills={[
					'HTML',
					'CSS',
					'JS',
					'Next.js',
					'React.js',
					'Auth',
					'PHP 8',
					'SQL',
					'PhpMyAdmin',
					'Figma',
					'Adobe XD',
					'Adobe Photoshop',
				]}
			/>
		</DashboardWrapper>
	)
}

type SkillProps = {
	name: string
}

export const Skill = ({ name }: SkillProps) => {
	return (
		<div className='px-3 py-2 rounded-lg border border-muted text-muted-foreground text-sm'>
			{name}
		</div>
	)
}

type AboutSkillsProps = {
	skills: string[]
}

export const AboutSkills = ({ skills }: AboutSkillsProps) => {
	return (
		<AboutInfoWrapper>
			<H4>Мои навыки</H4>
			<div className='flex flex-wrap gap-2'>
				{skills.map((item, idx) => (
					<Skill name={item} key={`candidate-skill-${idx}`} />
				))}
			</div>
		</AboutInfoWrapper>
	)
}

type AboutMeProps = {
	text: string
}

export const AboutMe = ({ text }: AboutMeProps) => {
	return (
		<AboutInfoWrapper>
			<H4>Обо мне</H4>
			<P className='leading-loose'>{text}</P>
		</AboutInfoWrapper>
	)
}

type AboutInfoProps = {
	dateBirth: string
	age: string
	department: string
	position: string
}

export const AboutInfo = ({
	dateBirth,
	age,
	department,
	position,
}: AboutInfoProps) => {
	return (
		<AboutInfoWrapper>
			<H4>Данные кандидата</H4>
			<ul className='flex flex-col gap-2'>
				<li className='flex items-center gap-2'>
					<span className='font-semibold text-foreground text-sm'>
						Дата рождения:
					</span>
					<span className='text-muted-foreground text-sm'>{dateBirth}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-semibold text-foreground text-sm'>
						Возраст:
					</span>
					<span className='text-muted-foreground text-sm'>{age}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-semibold text-foreground text-sm'>Отдел:</span>
					<span className='text-muted-foreground text-sm'>{department}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-semibold text-foreground text-sm'>
						Должность
					</span>
					<span className='text-muted-foreground text-sm'>{position}</span>
				</li>
			</ul>
		</AboutInfoWrapper>
	)
}

type AboutInfoWrapperProps = {
	children: React.ReactNode
}

export const AboutInfoWrapper = ({ children }: AboutInfoWrapperProps) => {
	return <div className='flex flex-col gap-4'>{children}</div>
}
