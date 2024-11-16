import { Logo } from './ui/logo'
import { SidebarTrigger } from './ui/sidebar'

export const DashboardMobileSidebarTrigger = () => {
	return (
		<div className='self-start bg-white p-3 h-14 rounded-xl'>
			<SidebarTrigger>
				<Logo />
			</SidebarTrigger>
		</div>
	)
}
