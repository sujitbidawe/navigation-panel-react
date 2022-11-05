import './App.css';
import { _getNavs } from './utils/_DATA.js';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './pages/sidebar/Sidebar';
import * as React from 'react';
const Login = React.lazy(() => import('./pages/login/Login'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Analysis = React.lazy(() => import('./pages/dashboard/analysis/Analysis'));
const Monitor = React.lazy(() => import('./pages/dashboard/monitor/Monitor'));
const Workplace = React.lazy(() => import('./pages/dashboard/workplace/Workplace'));
const List = React.lazy(() => import('./pages/projects/list/List'));
const Details = React.lazy(() => import('./pages/projects/details/Details'));
const Settings = React.lazy(() => import('./pages/projects/settings/Settings'));
const NotFound = React.lazy(() => import('./pages/pageNotFound/PageNotFound'));

function App() {

	const navigate = useNavigate();

	const [navs, setNavs] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		_getNavs().then((data) => {
			let data2 = Object.keys(data).map((nav, index) => {
				let elem: any = data[nav];
				elem['isSelected'] = false;
				elem['isHover'] = false;
				elem['isNested'] = elem.routes && elem.routes.length ? true : false;
				return elem
			})

			setNavs({ ...data2 });
		})
	}, [])

	const mouseEnter = (navIndex: any) => {
		let tempNavs = Object.assign({}, navs);
		tempNavs[navIndex].isHover = true;
		setNavs({ ...tempNavs });
	}

	const mouseLeave = (navIndex: any) => {
		let tempNavs = Object.assign({}, navs);
		tempNavs[navIndex].isHover = false;
		setNavs({ ...tempNavs });
	}

	const routeclicked = (nav: any) => {
		navigate(nav.path);
	}

	return (
		<div className="App">
			<div className='header'>
				<h3>breadCrumb1</h3>
				<h3>breadCrumb2</h3>
				<h3>breadCrumb3</h3>
			</div>
			<div className='container'>
				<Sidebar navs={navs} mouseEnter={mouseEnter} mouseLeave={mouseLeave} routeclicked={routeclicked} />
				<div className='right-container'>
				<Routes>
					<Route
						path='/'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<h1>Landing page</h1>
							</React.Suspense>
						}
					/>
					<Route
						path='/user/login'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Login />
							</React.Suspense>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Dashboard />
							</React.Suspense>
						}
					/>
					<Route
						path='/dashboard/analysis'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Analysis />
							</React.Suspense>
						}
					/>
					<Route
						path='/dashboard/monitor'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Monitor />
							</React.Suspense>
						}
					/>
					<Route
						path='/dashboard/workplace'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Workplace />
							</React.Suspense>
						}
					/>
					<Route
						path='/projects'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Navigate to={'/projects/list'} replace />
							</React.Suspense>
						}
					/>
					<Route
						path='/projects/list'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<List />
							</React.Suspense>
						}
					/>
					<Route
						path='/projects/:id'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Details />
							</React.Suspense>
						}
					/>
					<Route
						path='/projects/:id/settings'
						element={
							<React.Suspense fallback={<>Loading...</>}>
								<Settings />
							</React.Suspense>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
