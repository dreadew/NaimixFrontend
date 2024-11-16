import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const H4 = ({ children, className }: Props) => {
	return (
		<h4
			className={cn(
				'text-lg font-semibold tracking-tight text-foreground',
				className
			)}
		>
			{children}
		</h4>
	)
}
