import { Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInPageLink } from '../../constants/links'
import { getAge } from '../../lib/getAge'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { SkillsInfoDto, UserInfoDto } from '../../types/user.types'
import { Container } from '../Container'
import { DashboardWrapper } from '../DashboardWrapper'
import { Telegram } from '../icons/Telegram'
import { H4 } from '../typography/h4'
import { P } from '../typography/p'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Empty, EmptyText } from '../ui/empty'
import { UpdateAboutMeDialog } from '../UpdateAboutMeDialog'
import { UpdateSkillsDialog } from '../UpdateSkillsDialog'
import { UpdateUserInfoDialog } from '../UpdateUserInfoDialog'

export const AboutPage = () => {
	const { id } = useAuthStore()
	const [userInfo, setUserInfo] = useState<UserInfoDto | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await userService.GetMyProfile(id!)
				setUserInfo(data.data)
			} catch (err: unknown) {
				console.error(err)
			}
		}

		if (id) {
			fetchData()
		}
	}, [id])

	if (!userInfo) {
		navigate(SignInPageLink)
	}

	return (
		<DashboardWrapper className='h-[calc(100vh_-_3rem)]'>
			<Container
				className={cn(
					'h-full w-full bg-white rounded-3xl flex flex-col gap-12'
				)}
			>
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<div className='flex items-center gap-4'>
						<Avatar />
						<div className='flex flex-col'>
							<H4>
								{userInfo?.surname +
									' ' +
									userInfo?.name +
									' ' +
									userInfo?.patronymic}
							</H4>
							<P>Россия, Казань</P>
						</div>
					</div>
					<ContactInfo
						dateBirth={userInfo?.dateBirth ?? new Date().toLocaleDateString()}
						phoneNumber={userInfo?.phoneNumber ?? 'Не указан'}
						telegramLink={userInfo?.telegramLink ?? 'Не указан'}
					/>
				</div>

				<AboutInfo
					dateBirth={userInfo?.dateBirth || 'Не указана'}
					department={userInfo?.position?.department?.title || 'Не указан'}
					position={userInfo?.position?.title || 'Не указана'}
				/>

				<AboutMe text={userInfo?.aboutMe || ''} />

				<AboutSkills skills={userInfo?.skills ?? []} />
			</Container>
		</DashboardWrapper>
	)
}

type SkillProps = {
	skill: SkillsInfoDto
}

export const Skill = ({ skill }: SkillProps) => {
	const { id } = useAuthStore()
	const handleDelete = async () => {
		try {
			await userService.DeleteSkills({
				userId: id!,
				title: skill.title,
			})
			window.location.reload()
		} catch (err: unknown) {
			console.error(err)
		}
	}

	return (
		<div className='flex items-center px-3 py-2 rounded-lg border border-muted text-muted-foreground text-sm'>
			<span>{skill.title}</span>
			<Button
				className='ml-2 px-2 items-center justify-center py-0'
				onClick={handleDelete}
				variant={'ghost'}
			>
				<X className='h-4 w-4 text-muted-foreground' />
			</Button>
		</div>
	)
}

type AboutSkillsProps = {
	skills: SkillsInfoDto[]
}

export const AboutSkills = ({ skills }: AboutSkillsProps) => {
	return (
		<AboutInfoWrapper>
			<H4>Мои навыки</H4>
			<div className='flex flex-wrap gap-2'>
				{skills.length > 0 ? (
					skills.map((item, idx) => (
						<Skill skill={item} key={`candidate-skill-${idx}`} />
					))
				) : (
					<Empty>
						<EmptyText>Навыки не указаны</EmptyText>
					</Empty>
				)}
			</div>
			<UpdateSkillsDialog />
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
			{text ? (
				<P className='leading-loose'>{text}</P>
			) : (
				<Empty>
					<EmptyText>Описание не указано</EmptyText>
				</Empty>
			)}
			<UpdateAboutMeDialog />
		</AboutInfoWrapper>
	)
}

type AboutInfoProps = {
	dateBirth: string
	department: string
	position: string
}

export const AboutInfo = ({
	dateBirth,
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
					<span className='font-semibold text-foreground text-sm'>Отдел:</span>
					<span className='text-muted-foreground text-sm'>{department}</span>
				</li>
				<li className='flex items-center gap-2'>
					<span className='font-semibold text-foreground text-sm'>
						Должность:
					</span>
					<span className='text-muted-foreground text-sm'>{position}</span>
				</li>
			</ul>
			<UpdateUserInfoDialog />
		</AboutInfoWrapper>
	)
}

type AboutInfoWrapperProps = {
	children: React.ReactNode
}

export const AboutInfoWrapper = ({ children }: AboutInfoWrapperProps) => {
	return <div className='flex flex-col gap-4'>{children}</div>
}

type ContactInfoProps = {
	dateBirth: string
	phoneNumber: string
	telegramLink: string
}

export const ContactInfo = ({
	dateBirth,
	phoneNumber,
	telegramLink,
}: ContactInfoProps) => {
	return (
		<div className='p-3 rounded-xl border border-muted flex flex-col gap-2'>
			<span className='font-semibold text-foreground'>{getAge(dateBirth)}</span>
			<div className='flex items-center gap-2'>
				<Phone className='h-5 w-5 text-secondary' />
				{phoneNumber}
			</div>
			<div className='flex items-center gap-2'>
				<Telegram className='h-5 w-5 text-secondary' />
				{telegramLink}
			</div>
		</div>
	)
}
