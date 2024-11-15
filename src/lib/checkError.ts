import { ProblemDetailsError } from '../types/error.types'

export function isProblemDetailsError(
	error: unknown
): error is ProblemDetailsError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'title' in error &&
		'status' in error &&
		typeof error.title === 'string' &&
		typeof error.status === 'number'
	)
}
