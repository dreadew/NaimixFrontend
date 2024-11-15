import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Code = ({ children, className }: Props) => {
	return (
		<code
			className={cn(
				'relative rounded bg-accent px-[0.3rem] py-[0.2rem] text-sm font-semibold text-foreground',
				className
			)}
		>
			{children}
		</code>
	)
}
