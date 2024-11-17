export function getAge(date: string) {
	const parts = date.split('.')
	const day = parseInt(parts[0], 10)
	const month = parseInt(parts[1], 10)
	const year = parseInt(parts[2], 10)
	const birthDate = new Date(year, month, day)
	const today = new Date()
	const age = today.getFullYear() - birthDate.getFullYear()

	return age
}
