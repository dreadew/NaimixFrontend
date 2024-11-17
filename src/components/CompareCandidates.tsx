import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import natalCardService from '../services/natalCard.service'
import { CompatibilityResult, GroupResult } from '../types/natalCards.types'
import { CandidateInfo } from '../types/user.types'
import { RecommendationsDialog } from './RecommendationsDialog'
import { H2 } from './typography/h2'
import { H3 } from './typography/h3'
import { H4 } from './typography/h4'
import { P } from './typography/p'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

type Props = {
	candidates: CandidateInfo[]
	results: CompatibilityResult | undefined
	groupCompatibility: GroupResult | undefined
	toCompare: {
		person1: number
		person2: number
	}
	onCompare: (res: CompatibilityResult) => void
	onCandidateChange: (person: number, idx: number) => void
}

export const CompareCandidates = ({
	candidates,
	toCompare,
	results,
	groupCompatibility,
	onCompare,
	onCandidateChange,
}: Props) => {
	const handleCompare = async () => {
		try {
			const person1 = candidates[toCompare.person1]
			const person2 = candidates[toCompare.person2]
			if (person1.id === person2.id) {
				return
			}

			const { data } = await natalCardService.GetCompatibilityForTwo({
				person1: {
					full_name:
						person1.surname + ' ' + person1.name + ' ' + person1.patronymic,
					birth_date: person1.dateBirth,
					skills: person1.skills,
				},
				person2: {
					full_name:
						person2.surname + ' ' + person2.name + ' ' + person2.patronymic,
					birth_date: person2.dateBirth,
					skills: person2.skills,
				},
			})

			onCompare(data.data)
		} catch (err: unknown) {
			console.error(err)
		}
	}

	return (
		<section className='w-full bg-white flex flex-col gap-6'>
			<div className='flex flex-col justify-between gap-6'>
				<H2>Результаты сравнения</H2>
				<div className='grid items-center gap-4 grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1'>
					<ComparableCandidate
						personNum={1}
						currCandidate={toCompare.person1}
						onCandidateChange={onCandidateChange}
						candidatesLength={candidates.length}
						candidate={candidates[toCompare.person1]}
					/>
					<Button
						onClick={handleCompare}
						variant={'secondary'}
						className='h-full lg:h-2/3'
						size={'big'}
					>
						Сравнить
					</Button>
					<ComparableCandidate
						personNum={2}
						currCandidate={toCompare.person2}
						onCandidateChange={onCandidateChange}
						candidatesLength={candidates.length}
						candidate={candidates[toCompare.person2]}
					/>
				</div>
			</div>
			<Separator />
			{results && (
				<CompareResults
					total_score={results.total_score}
					compatibility_level={results.compatibility_level}
					explanations={results.explanations}
				/>
			)}
			<Separator />
			{groupCompatibility && (
				<>
					<CandidateRecommendations data={groupCompatibility} />
					<Matrix
						candidates={candidates}
						compatibilityMatrix={groupCompatibility.compatibility_matrix}
					/>
				</>
			)}
		</section>
	)
}

type ComparableCandidateProps = {
	personNum: number
	candidatesLength: number
	currCandidate: number
	candidate: CandidateInfo
	onCandidateChange: (person: number, idx: number) => void
}

export const ComparableCandidate = ({
	personNum,
	candidatesLength,
	currCandidate,
	candidate,
	onCandidateChange,
}: ComparableCandidateProps) => {
	const department = candidate?.department ?? 'Отдел не указан'
	const position = candidate?.position ?? 'Должность не указана'

	const nextCandidate = () => {
		if (currCandidate < candidatesLength - 1) {
			onCandidateChange(personNum, currCandidate + 1)
		} else {
			onCandidateChange(personNum, 0)
		}
	}

	const prevCandidate = () => {
		if (currCandidate > 0) {
			onCandidateChange(personNum, currCandidate - 1)
		} else {
			onCandidateChange(personNum, candidatesLength - 1)
		}
	}

	return (
		<Card className='rounded-xl shadow-none'>
			<CardContent className='px-10 py-6 h-full flex items-center justify-center gap-2'>
				<Button
					onClick={prevCandidate}
					className='ml-2 px-2 items-center justify-center py-0'
					variant={'ghost'}
				>
					<ChevronLeft className='h-6 w-6 text-muted-foreground' />
				</Button>
				<div className='flex flex-col items-center gap-2'>
					<Avatar />
					<H4 className='text-center'>{candidate?.name}</H4>
					<P className='text-center'>{department + ', ' + position}</P>
				</div>
				<Button
					onClick={nextCandidate}
					className='ml-2 px-2 items-center justify-center py-0'
					variant={'ghost'}
				>
					<ChevronRight className='h-6 w-6 text-muted-foreground' />
				</Button>
			</CardContent>
		</Card>
	)
}

type CompareResultsProps = {
	total_score: number
	compatibility_level: string
	explanations: {
		Стихии: string[]
		'Стратегии поведения': string[]
		Астрология: string[]
	}
}

export const CompareResults = ({
	total_score,
	compatibility_level,
	explanations,
}: CompareResultsProps) => {
	return (
		<div className='flex flex-col gap-6'>
			<H3>Общий балл совместимости: {total_score}</H3>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-wrap gap-2 items-start justify-between'>
					<H4>Подробное описание</H4>
					<RecommendationsDialog />
				</div>
				<ul className='flex flex-col gap-2'>
					<ResultsItem
						name='Общий балл совместимости'
						value={total_score.toString()}
					/>
					<ResultsItem
						name='Уровень совместимости'
						value={compatibility_level}
					/>
					{explanations.Астрология.map((item, idx) => (
						<ResultsItem key={`explanation-astrology-${idx}`} value={item} />
					))}
					{explanations.Стихии.map((item, idx) => (
						<ResultsItem key={`explanation-element-${idx}`} value={item} />
					))}
					{explanations['Стратегии поведения'].map((item, idx) => (
						<ResultsItem key={`explanation-strategy-${idx}`} value={item} />
					))}
				</ul>
			</div>
		</div>
	)
}

type ResultsProps = {
	name?: string
	value: string
}

export const ResultsItem = ({ value, name }: ResultsProps) => {
	return (
		<li className='flex items-center gap-2'>
			{name && <span className='font-semibold text-foreground'>{name}:</span>}
			<span
				className={cn(
					'font-medium',
					value.split('')[0] === '-'
						? 'text-secondary-text'
						: value.split('')[0] === '+'
						? 'text-primary-text'
						: 'text-muted-foreground'
				)}
			>
				{value}
			</span>
		</li>
	)
}

type CandidateRecommendationsProps = {
	data: GroupResult
}

export const CandidateRecommendations = ({
	data,
}: CandidateRecommendationsProps) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<H4>Рекомендации по кандидатам</H4>
				<RecommendationsDialog />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ФИО</TableHead>
						<TableHead>Баллы</TableHead>
						<TableHead>Рекомендация</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.results.map((item, idx) => (
						<TableRow key={`candidate-recommendation-${idx}`}>
							<TableCell className='flex items-center gap-2'>
								<Avatar className='h-10 w-10 hidden lg:flex' />
								{item.full_name}
							</TableCell>
							<TableCell>{item.total_score}</TableCell>
							<TableCell>{item.recommendation}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

type MatrixProps = {
	candidates: CandidateInfo[]
	compatibilityMatrix: [][]
}

export const Matrix = ({ candidates, compatibilityMatrix }: MatrixProps) => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<H4>Матрица астрологических баллов совместимости</H4>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>ФИО</TableHead>
						{candidates.map((item, idx) => (
							<TableHead className='text-center' key={`table-head-row-${idx}`}>
								{item.surname + ' ' + item.name + ' ' + item.patronymic}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{candidates.map((item, idx) => (
						<TableRow key={`table-header-row-${idx}`}>
							<TableCell className='text-center text-muted-foreground'>
								{item.surname + ' ' + item.name + ' ' + item.patronymic}
							</TableCell>
							{compatibilityMatrix[idx].map(item => (
								<TableCell className='text-center font-semibold'>
									{item}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
