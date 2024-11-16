import { DashboardSidebar } from '../DashboardSidebar'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'

export const DashboardPage = () => {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<section className='min-h-screen w-full flex items-center justify-center'>
				<SidebarTrigger />
			</section>
		</SidebarProvider>
	)
}
