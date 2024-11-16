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
	candidates: {
		id: string
		name: string
		department: string
		position: string
		favorite: boolean
	}[]
}

export const CompareCandidates = ({ candidates }: Props) => {
	return (
		<section className='w-full bg-white flex flex-col gap-6'>
			<div className='flex flex-col justify-between gap-6'>
				<H2>Результаты сравнения</H2>
				<div className='grid items-center gap-4 grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1'>
					<ComparableCandidate candidate={candidates[0]} />
					<Button
						variant={'secondary'}
						className='h-full lg:h-2/3'
						size={'big'}
					>
						Сравнить
					</Button>
					<ComparableCandidate candidate={candidates[1]} />
				</div>
			</div>
			<Separator />
			<CompareResults
				total_score={19}
				compatibility_level='Высокая совместимость'
				explanations={{
					Стихии: [
						'+ Стихия Огонь сбалансирована между людьми, что способствует гармонии.',
						'+ Стихия Земля сбалансирована между людьми, что способствует гармонии.',
						'+ Стихия Воздух сбалансирована между людьми, что способствует гармонии.',
						'+ Стихия Вода сбалансирована между людьми, что способствует гармонии.',
						'+ У обоих нет доминирующей стихии, что способствует гибкости и адаптивности.',
					],
					'Стратегии поведения': [
						'+ Стратегия Кардинальность уравновешена между участниками, это улучшает совместимость.',
						'+ Стратегия Фиксированность уравновешена между участниками, это улучшает совместимость.',
						'+ Стратегия Мутабельность уравновешена между участниками, это улучшает совместимость.',
					],
					Астрология: [
						'- Солнце и Луна не гармонируют, возможны эмоциональные разногласия.',
						'- Венера и Марс не гармонируют, возможны трудности в личных и рабочих взаимодействиях.',
						'+ Солнце в знаках одной стихии, это улучшает понимание и общие цели.',
					],
				}}
			/>
			<Separator />
			<CandidateRecommendations
				data={[
					{
						full_name: 'Иван Иванов',
						total_score: 38,
						recommendation: 'Рекомендация пока не реализована.',
					},
					{
						full_name: 'Мария Петрова',
						total_score: 38,
						recommendation: 'Рекомендация пока не реализована.',
					},
					{
						full_name: 'Алексей Смирнов',
						total_score: 38,
						recommendation: 'Рекомендация пока не реализована.',
					},
				]}
			/>
		</section>
	)
}

type ComparableCandidateProps = {
	candidate: {
		id: string
		name: string
		department: string
		position: string
		favorite: boolean
	}
}

export const ComparableCandidate = ({
	candidate,
}: ComparableCandidateProps) => {
	return (
		<Card className='rounded-xl shadow-none'>
			<CardContent className='px-10 py-6 h-full flex flex-col items-center justify-center'>
				<Avatar />
				<H4 className='text-center'>{candidate.name}</H4>
				<P className='text-center'>
					{candidate.department + ', ' + candidate.position}
				</P>
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
			<H3>{total_score} баллов совместимости</H3>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-2 items-center justify-between'>
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
			<span className='text-muted-foreground'>{value}</span>
		</li>
	)
}

type CandidateRecommendationsProps = {
	data: {
		full_name: string
		total_score: number
		recommendation: string
	}[]
}

export const CandidateRecommendations = ({
	data,
}: CandidateRecommendationsProps) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-2'>
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
					{data.map((item, idx) => (
						<TableRow key={`candidate-recommendation-${idx}`}>
							<TableCell className='flex items-center gap-2'>
								<Avatar className='h-10 w-10' />
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
