import { ChevronUp, User2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { items } from '../constants/menu-items'
import { useAuthStore } from '../stores/authStore'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdownMenu'
import { Logo } from './ui/logo'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from './ui/sidebar'

export const DashboardSidebar = () => {
	const { name, logout } = useAuthStore()
	const location = useLocation()

	const handleLogout = async () => {
		logout()
		window.location.reload()
	}

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='mt-2'>
				<SidebarTrigger>
					<Logo className='h-8 w-8' />
				</SidebarTrigger>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>ОСНОВНОЕ</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										isActive={location.pathname === item.url}
										asChild
									>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='mb-2'>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {name}
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side='top'
								align='start'
								className='w-[--radix-popper-anchor-width]'
							>
								<DropdownMenuItem onClick={handleLogout}>
									<span>Выйти</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
