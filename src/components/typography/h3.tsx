import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const H3 = ({ children, className }: Props) => {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground',
				className
			)}
		>
			{children}
		</h3>
	)
}
