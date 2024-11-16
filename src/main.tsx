import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AboutPage } from './components/pages/AboutPage.tsx'
import { CandidatePage } from './components/pages/CandidatePage.tsx'
import { ComparePage } from './components/pages/ComparePage.tsx'
import { ErrorPage } from './components/pages/ErrorPage.tsx'
import { SignInPage } from './components/pages/SignInPage.tsx'
import { SignUpPage } from './components/pages/SignUpPage.tsx'
import { RequireAuth } from './components/RequireAuth.tsx'
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
		element: (
			<RequireAuth>
				<CandidatePage />
			</RequireAuth>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: ComparePageLink,
		element: (
			<RequireAuth>
				<ComparePage />
			</RequireAuth>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: AboutPageLink,
		element: (
			<RequireAuth>
				<AboutPage />
			</RequireAuth>
		),
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
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
