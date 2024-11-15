export type ProblemDetailsError = {
	type: string
	title: string
	status: number
	detail: string | null
	instance: string | null
}

export type ApiError = {
	message: string
	cause: string
	code: number
}
