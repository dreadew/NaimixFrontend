import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DashboardPage } from './components/pages/DashboardPage.tsx'
import { ErrorPage } from './components/pages/ErrorPage.tsx'
import { MainPage } from './components/pages/MainPage.tsx'
import { SignInPage } from './components/pages/SignInPage.tsx'
import { SignUpPage } from './components/pages/SignUpPage.tsx'
import { TestPage } from './components/pages/TestPage.tsx'
import {
	DashboardPageLink,
	MainPageLink,
	SignInPageLink,
	SignUpPageLink,
} from './constants/links.ts'
import './index.css'

const router = createBrowserRouter([
	{
		path: MainPageLink,
		element: <MainPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: DashboardPageLink,
		element: <DashboardPage />,
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
