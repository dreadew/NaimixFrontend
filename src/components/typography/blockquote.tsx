import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Blockquote = ({ children, className }: Props) => {
	return (
		<blockquote
			className={cn(
				'mt-6 border-l-2 border-accent pl-6 italic text-foreground',
				className
			)}
		>
			{children}
		</blockquote>
	)
}
