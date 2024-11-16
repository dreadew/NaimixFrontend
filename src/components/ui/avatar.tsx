import { User } from 'lucide-react'
import { cn } from '../../lib/utils'

type Props = {
	className?: string
}

export const Avatar = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'h-16 w-16 flex items-center justify-center rounded-full bg-primary',
				className
			)}
		>
			<User className='text-background' />
		</div>
	)
}
