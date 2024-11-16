import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

type Props = {
	isFavorite: boolean
}

export const FavoriteCandidateIcon = ({ isFavorite }: Props) => {
	return (
		<Star
			className={cn(
				'h-5 w-5 stroke-none',
				isFavorite ? 'fill-primary' : 'stroke-muted-foreground'
			)}
		/>
	)
}
