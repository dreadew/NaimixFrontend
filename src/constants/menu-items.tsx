import { Diff, SquareUser, Users } from 'lucide-react'
import { AboutPageLink, CandidatePageLink, ComparePageLink } from './links'

export const items = [
	{
		title: 'Обо мне',
		url: AboutPageLink,
		icon: SquareUser,
	},
	{
		title: 'Кандидаты',
		url: CandidatePageLink,
		icon: Users,
	},
	{
		title: 'Сравнение',
		url: ComparePageLink,
		icon: Diff,
	},
]
