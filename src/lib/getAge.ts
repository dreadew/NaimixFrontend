export function getAge(date: string) {
	console.log(date)
	const birthDate = new Date(Date.parse(date))
	const today = new Date()
	const age = today.getFullYear() - birthDate.getFullYear()

	return `${age} лет`
}
