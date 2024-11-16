import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Empty = ({ children, className }: Props) => {
	return (
		<div className={cn('w-full p-3 rounded-xl border border-muted', className)}>
			{children}
		</div>
	)
}

export const EmptyText = ({ children, className }: Props) => {
	return (
		<span
			className={cn('text-md font-medium text-muted-foreground', className)}
		>
			{children}
		</span>
	)
}
