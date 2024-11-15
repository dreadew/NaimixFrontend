import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const P = ({ children, className }: Props) => {
	return (
		<p
			className={cn(
				'leading-7 text-md text-accent-foreground font-medium',
				className
			)}
		>
			{children}
		</p>
	)
}
