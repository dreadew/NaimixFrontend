import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { CandidateActionsDropdown } from './CandidateActionsDropdown'
import { CandidatesSearch } from './CandidatesSearch'
import { FavoriteCandidateIcon } from './FavoriteCandidateIcon'
import { Checkbox } from './ui/checkbox'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

type Props = {
	candidates: {
		id: string
		name: string
		department: string
		position: string
		favorite: boolean
	}[]
}

export const CandidatesTable = ({ candidates }: Props) => {
	const [localCandidates, setLocalCandidates] = useState(candidates)
	const [currCandidates, setCurrCandidates] = useState<string[]>([])
	const [value, setValue] = useState<string>('')
	const debouncedValue = useDebounce(value, 1000)

	const handleChange = (val: string) => {
		setValue(val)
	}

	useEffect(() => {
		if (value) {
			setLocalCandidates(
				candidates.filter(c =>
					c.name.toLowerCase().includes(debouncedValue.toLowerCase())
				)
			)
		} else {
			if (localCandidates.length !== candidates.length) {
				setLocalCandidates(candidates)
			}
		}
	}, [debouncedValue])

	useEffect(() => {
		setLocalCandidates(candidates)
	}, [candidates])

	return (
		<>
			<CandidatesSearch value={value} onChange={handleChange} />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[5rem]'>
							<CandidateActionsDropdown currCandidates={currCandidates} />
						</TableHead>
						<TableHead>ФИО</TableHead>
						<TableHead>Отдел</TableHead>
						<TableHead>Должность</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{localCandidates.map((item, idx) => (
						<TableRow className='h-14' key={`candidate-${idx}`}>
							<TableCell>
								<span className='flex items-center'>
									<Checkbox
										onCheckedChange={e => {
											if (e) {
												setCurrCandidates(prev => [...prev, item.id])
												return
											}
											setCurrCandidates(prev => prev.filter(c => c !== item.id))
										}}
										className='mr-4'
									/>
									<FavoriteCandidateIcon isFavorite={item.favorite} />
								</span>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.department}</TableCell>
							<TableCell>{item.position}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
