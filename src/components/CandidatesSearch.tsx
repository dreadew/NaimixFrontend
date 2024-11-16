import { Input } from './ui/input'

type Props = {
	value: string
	onChange: (value: string) => void
}

export const CandidatesSearch = ({ value, onChange }: Props) => {
	return (
		<Input
			placeholder='Найдите кандидата...'
			className='w-full'
			value={value}
			onChange={e => onChange(e.target.value)}
		/>
	)
}
