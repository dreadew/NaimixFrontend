import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SignInPageLink } from '../../constants/links'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { UserInfoDto } from '../../types/user.types'
import { Container } from '../Container'
import { DashboardWrapper } from '../DashboardWrapper'
import { H4 } from '../typography/h4'
import { P } from '../typography/p'
import { Avatar } from '../ui/avatar'
import { AboutInfo, AboutMe, AboutSkills, ContactInfo } from './AboutPage'

export const CandidateInfoPage = () => {
	const params = useParams()
	const [userInfo, setUserInfo] = useState<UserInfoDto | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await userService.GetMyProfile(params.id!)
				setUserInfo(data.data)
			} catch (err: unknown) {
				console.error(err)
			}
		}

		if (params.id) {
			fetchData()
		}
	}, [params?.id])

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
					department={userInfo?.position || 'Не указан'}
					position={userInfo?.department || 'Не указана'}
					editable={false}
				/>

				<AboutMe text={userInfo?.aboutMe || ''} editable={false} />

				<AboutSkills skills={userInfo?.skills ?? []} editable={false} />
			</Container>
		</DashboardWrapper>
	)
}
