import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const P = ({ children, className }: Props) => {
	return (
		<p className={cn('text-sm text-muted-foreground font-medium', className)}>
			{children}
		</p>
	)
}
