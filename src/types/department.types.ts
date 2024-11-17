export type DepartmentDto = {
	id: string
	title: string
	createdAt: string
	updatedAt: string
}

export type CreateDepartmentDto = {
	title: string
}

export type CreateDepartmentResponseDto = {
	id: string
}

export type UpdateDepartmentDto = {
	id: string
	title: string
}

export type DeleteDepartmentDto = {
	id: string
}
