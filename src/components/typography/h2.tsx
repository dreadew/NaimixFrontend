import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const H2 = ({ children, className }: Props) => {
	return (
		<h2
			className={cn(
				'scroll-m-20 text-3xl font-semibold tracking-tight text-foreground',
				className
			)}
		>
			{children}
		</h2>
	)
}
