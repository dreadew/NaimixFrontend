import { cn } from '../../lib/utils'

type Props = {
	className?: string
}

export const Logo = ({ className }: Props) => {
	return (
		<svg
			width='256'
			height='256'
			viewBox='0 0 256 256'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={cn(className, 'fill-primary')}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M48 0C21.4903 0 0 21.4903 0 48V208C0 234.51 21.4903 256 48 256H208C234.51 256 256 234.51 256 208V48C256 21.4903 234.51 0 208 0H48ZM56 56C46.0589 56 38 64.0589 38 74V86C38 95.9411 46.0589 104 56 104H72C81.9411 104 90 112.059 90 122V134C90 143.941 98.0589 152 108 152H110C119.941 152 128 160.059 128 170V182C128 191.941 136.059 200 146 200H200C209.941 200 218 191.941 218 182V170C218 160.059 209.941 152 200 152H183C173.059 152 165 143.941 165 134V122C165 112.059 156.941 104 147 104H146C136.059 104 128 95.9411 128 86V74C128 64.0589 119.941 56 110 56H56ZM218 84.6863V64C218 59.5817 214.418 56 210 56H189.314C182.186 56 178.617 64.6171 183.657 69.6569L204.343 90.3431C209.383 95.3829 218 91.8135 218 84.6863ZM56 200C65.9411 200 74 191.941 74 182C74 172.059 65.9411 164 56 164C46.0589 164 38 172.059 38 182C38 191.941 46.0589 200 56 200Z'
			/>
		</svg>
	)
}

export const LogoWithText = ({ className }: Props) => {
	return (
		<div className='flex items-center gap-2'>
			<Logo className={className} />
			<span className='text-sm font-medium text-foreground'>Null moon</span>
		</div>
	)
}
