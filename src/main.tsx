import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AboutPage } from './components/pages/AboutPage.tsx'
import { CandidatePage } from './components/pages/CandidatePage.tsx'
import { ComparePage } from './components/pages/ComparePage.tsx'
import { ErrorPage } from './components/pages/ErrorPage.tsx'
import { SignInPage } from './components/pages/SignInPage.tsx'
import { SignUpPage } from './components/pages/SignUpPage.tsx'
import { TestPage } from './components/pages/TestPage.tsx'
import {
	AboutPageLink,
	CandidatePageLink,
	ComparePageLink,
	MainPageLink,
	SignInPageLink,
	SignUpPageLink,
} from './constants/links.ts'
import './index.css'

const router = createBrowserRouter([
	{
		path: MainPageLink,
		element: <SignInPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: CandidatePageLink,
		element: <CandidatePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: ComparePageLink,
		element: <ComparePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: AboutPageLink,
		element: <AboutPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: SignInPageLink,
		element: <SignInPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: SignUpPageLink,
		element: <SignUpPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/test',
		element: <TestPage />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
