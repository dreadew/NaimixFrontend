import { cn } from '../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Container = ({ children, className }: Props) => {
	return (
		<div className={cn('max-auto max-w-[80rem] px-8 py-8', className)}>
			{children}
		</div>
	)
}
