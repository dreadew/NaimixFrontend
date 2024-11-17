import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isProblemDetailsError } from '../../lib/checkError'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { PositionDto } from '../../types/position.types'
import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const formSchema = z.object({
	id: z.string(),
	positionId: z.string(),
})

export const UpdateCandidateInformationForm = () => {
	const [positions, setPositions] = useState<PositionDto[]>([])
	const { id } = useAuthStore()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: id!,
			positionId: '',
		},
	})

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const { data } = await userService.GetAllPositions()
				setPositions(data.data)
			} catch (err: unknown) {
				console.error(err)
			}
		}

		fetchPositions()
	}, [])

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		try {
			await userService.Update({
				id: values.id,
				positionId: values.positionId,
			})
			window.location.reload()
		} catch (err: unknown) {
			if (isProblemDetailsError(err)) {
				console.error(err.detail)
			}
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='max-w-[40rem] w-full flex flex-col gap-3'
			>
				<div className='flex flex-col gap-2'>
					<FormField
						control={form.control}
						name='positionId'
						render={({ field }) => (
							<FormItem className='flex flex-col gap-1'>
								<FormLabel>Должность</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												role='combobox'
												className={cn(
													'justify-between active:scale-100',
													!field.value && 'text-muted-foreground'
												)}
											>
												{field.value
													? positions.find(p => p.id === field.value)?.title
													: 'Выберите должность'}
												<ChevronsUpDown className='opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent align='start'>
										<Command>
											<CommandInput
												placeholder='Поиск должности...'
												className='h-9'
											/>
											<CommandList>
												<CommandEmpty>Должность не найдена</CommandEmpty>
												<CommandGroup>
													{positions.map(p => (
														<CommandItem
															value={p.id}
															key={p.id}
															onSelect={() => {
																form.setValue('positionId', p.id)
															}}
														>
															{p.title}{' '}
															<Check
																className={cn(
																	'ml-auto',
																	p.title === field.value
																		? 'opacity-100'
																		: 'opactiy-0'
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='mt-2' disabled={isLoading} type='submit'>
					Обновить
				</Button>
			</form>
		</Form>
	)
}