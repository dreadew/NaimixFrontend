import { User } from 'lucide-react'

export const Avatar = () => {
	return (
		<div className='h-16 w-16 flex items-center justify-center rounded-full bg-primary'>
			<User className='text-background' />
		</div>
	)
}
