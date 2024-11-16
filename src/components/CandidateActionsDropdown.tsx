import { Ellipsis } from 'lucide-react'
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
	currCandidates: Array<string>
}

export const CandidateActionsDropdown = ({ currCandidates }: Props) => {
	const handleAddToFavorite = async () => {
		console.log(currCandidates)
	}

	const handleDelete = async () => {
		console.log(currCandidates)
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
				<DropdownMenuItem onClick={handleDelete}>Удалить</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
