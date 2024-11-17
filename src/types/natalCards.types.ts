export type PersonInfo = {
	full_name: string
	birth_date: string
	skills?: string[]
}

export type TwoPeopleCompatibilityRequest = {
	person1: PersonInfo
	person2: PersonInfo
}

export type DepartmentCompatibilityRequest = {
	people: PersonInfo[]
}

export type CompatibilityResult = {
	total_score: number
	compatibility_level: string
	explanations: {
		Стихии: string[]
		'Стратегии поведения': string[]
		Астрология: string[]
	}
}

export type GroupCompatibilityResult = {
	full_name: string
	total_score: number
	recommendation: string
}

export type GroupResult = {
	results: GroupCompatibilityResult[]
	compatibility_matrix: [][]
}
