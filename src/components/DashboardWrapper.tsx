import { useIsMobile } from '../hooks/useMobile'
import { cn } from '../lib/utils'
import { DashboardMobileSidebarTrigger } from './DashboardMobileSidebarTrigger'
import { DashboardSidebar } from './DashboardSidebar'
import { SidebarProvider } from './ui/sidebar'

type Props = {
	children: React.ReactNode
	className?: string
}

export const DashboardWrapper = ({ children, className }: Props) => {
	const isMobile = useIsMobile()

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<section className={cn('w-full h-full flex', className)}>
				{isMobile && <DashboardMobileSidebarTrigger />}
				{children}
			</section>
		</SidebarProvider>
	)
}
