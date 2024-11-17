import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import userService from '../../services/user.service'
import { useAuthStore } from '../../stores/authStore'
import { DepartmentDto } from '../../types/department.types'
import { Container } from '../Container'
import { CreateDepartmentDialog } from '../CreateDepartmentDialog'
import { CreatePositionDialog } from '../CreatePositionDialog'
import { DashboardWrapper } from '../DashboardWrapper'
import { DeleteDepartmentDialog } from '../DeleteDepartmentDialog'
import { DeletePositionDialog } from '../DeletePositionDialog'
import { H3 } from '../typography/h3'
import { H4 } from '../typography/h4'
import { Empty, EmptyText } from '../ui/empty'
import { UpdateDepartmentDialog } from '../UpdateDepartmentDialog'
import { UpdatePositionDialog } from '../UpdatePositionDialog'

export const CompanyPage = () => {
	const { id } = useAuthStore()
	const [departments, setDepartments] = useState<DepartmentDto[] | null>(null)

	useEffect(() => {
		const fetchDepartmentsData = async () => {
			try {
				const { data } = await userService.GetAllDepartments()
				setDepartments(data.data)
			} catch (err: unknown) {
				console.error(err)
			}
		}

		if (id) {
			fetchDepartmentsData()
		}
	}, [id])

	return (
		<DashboardWrapper className='flex-col gap-6 h-[calc(100vh_-_3rem)]'>
			<Container
				className={cn(
					'h-full w-full bg-white rounded-3xl flex flex-col gap-12'
				)}
			>
				<H3>Информация о компании</H3>

				<DepartmentList departments={departments} />
				<PositionList departments={departments} />
			</Container>
		</DashboardWrapper>
	)
}

type Props = {
	departments: DepartmentDto[] | null
}

export const DepartmentList = ({ departments }: Props) => {
	return (
		<div className='flex flex-col gap-4'>
			<H4>Список отделов</H4>
			<ul className='flex flex-col gap-2'>
				{departments && departments.length > 0 ? (
					departments?.map((item, idx) => (
						<DepartmentItem
							id={item.id}
							title={item.title}
							key={`department-${idx}`}
						/>
					))
				) : (
					<Empty>
						<EmptyText>Отделы не найдены</EmptyText>
					</Empty>
				)}
			</ul>
			<CreateDepartmentDialog />
		</div>
	)
}

type DepartmentItemProps = {
	id: string
	title: string
}

export const DepartmentItem = ({ id, title }: DepartmentItemProps) => {
	return (
		<li className='flex items-center justify-between gap-2'>
			<span className='text-lg font-medium text-muted-foreground'>{title}</span>
			<div className='flex items-center gap-2'>
				<UpdateDepartmentDialog departmentId={id} />
				<DeleteDepartmentDialog departmentId={id} />
			</div>
		</li>
	)
}

type PositionProps = {
	departments: DepartmentDto[] | null
}

export const PositionList = ({ departments }: PositionProps) => {
	const [positions, setPositions] = useState<DepartmentDto[]>([])

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

	return (
		<div className='flex flex-col gap-4'>
			<H4>Список должностей</H4>
			<ul className='flex flex-col gap-2'>
				{positions.length > 0 ? (
					positions.map((item, idx) => (
						<PositionItem
							id={item.id}
							title={item.title}
							key={`position-${idx}`}
						/>
					))
				) : (
					<Empty>
						<EmptyText>Должности не найдены</EmptyText>
					</Empty>
				)}
			</ul>
			<CreatePositionDialog departments={departments} />
		</div>
	)
}

type PositionItemProps = {
	id: string
	title: string
}

export const PositionItem = ({ id, title }: PositionItemProps) => {
	return (
		<li className='flex items-center justify-between gap-2'>
			<span className='text-lg font-medium text-muted-foreground'>{title}</span>
			<div className='flex items-center gap-2'>
				<UpdatePositionDialog positionId={id} />
				<DeletePositionDialog positionId={id} />
			</div>
		</li>
	)
}
