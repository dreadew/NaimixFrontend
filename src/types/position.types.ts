import { DepartmentDto } from './department.types'

export type PositionDto = {
	id: string
	title: string
	department: DepartmentDto
	createdAt: string
	updatedAt: string
}

export type CreatePositionDto = {
	departmentId: string
	title: string
}

export type CreatePositionResponseDto = {
	id: string
}

export type UpdatePositionDto = {
	id: string
	title: string
}

export type DeletePositionDto = {
	id: string
}
