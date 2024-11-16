import { Ellipsis } from 'lucide-react'
import { DecodeToken, GetAccessToken } from '../services/cookies.service'
import userService from '../services/user.service'
import { useAuthStore } from '../stores/authStore'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdownMenu'

type Props = {
	currCandidates: {
		id: string
		favorite: boolean
	}[]
}

export const CandidateActionsDropdown = ({ currCandidates }: Props) => {
	const { id } = useAuthStore()

	const handleAddToFavorite = async () => {
		try {
			const accessToken = GetAccessToken()
			if (!accessToken) {
				throw new Error('Не найден Access Token')
			}

			const decodedToken = await DecodeToken(accessToken!)
			if (!decodedToken) {
				throw new Error('Некорректный AccessToken')
			}

			await userService.AddUsersToFavorites({
				mainUserId: id!,
				favoriteUsersIds: currCandidates
					.filter(c => !c.favorite)
					.map(c => c.id),
			})

			window.location.reload()
		} catch (err: unknown) {
			console.error(err)
		}
	}

	const handleDelete = async () => {
		try {
			const accessToken = GetAccessToken()
			if (!accessToken) {
				throw new Error('Не найден Access Token')
			}

			const decodedToken = await DecodeToken(accessToken!)
			if (!decodedToken) {
				throw new Error('Некорректный AccessToken')
			}

			await userService.DeleteUsersFromFavorites({
				mainUserId: id!,
				favoriteUsersIds: currCandidates.map(c => c.id),
			})

			window.location.reload()
		} catch (err: unknown) {
			console.error(err)
		}
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'invisible'} size={'invisible'}>
					<Ellipsis className='text-muted-foreground' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start'>
				<DropdownMenuLabel>Действия</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleAddToFavorite}>
					Добавить в избранное
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>
					Удалить из избранного
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
