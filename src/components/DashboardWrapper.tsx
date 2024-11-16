import { cn } from '../lib/utils'
import { Container } from './Container'
import { DashboardSidebar } from './DashboardSidebar'
import { SidebarProvider } from './ui/sidebar'

type Props = {
	children: React.ReactNode
	className?: string
}

export const DashboardWrapper = ({ children, className }: Props) => {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<Container className='h-[calc(100vh_-_3rem)] w-full bg-white rounded-3xl'>
				<section className={cn('h-full flex', className)}>{children}</section>
			</Container>
		</SidebarProvider>
	)
}
