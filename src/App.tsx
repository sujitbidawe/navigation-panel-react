import './App.css';
import { _getNavs } from './utils/_DATA.js';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './pages/sidebar/Sidebar';
import Breadcrumbs from './pages/breadcrumbs/Breadcrumbs';
import * as React from 'react';

function App() {

	const navigate = useNavigate();

	const [navs, setNavs] = useState<{ [key: string]: any }>({});

	useEffect(() => {
		_getNavs().then((data) => {
			let modifiedData = Object.keys(data).map((nav, index) => {
				let elem: any = data[nav];
				elem['isHover'] = false;
				return elem
			})

			setNavs({ ...modifiedData });
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

	const routeClicked = (nav: any) => {
		navigate(nav.path);
	}

	function flattenRoutes(navs: any): any {
		return Object.keys(navs).map((route: any) => [navs[route].routes ? flattenRoutes(navs[route].routes) : [], navs[route]]).flat(Infinity);
	}

	return (
		<div className="App">
			<Breadcrumbs navs={navs}></Breadcrumbs>
			<div className='container'>
				<Sidebar navs={navs} mouseEnter={mouseEnter} mouseLeave={mouseLeave} routeClicked={routeClicked} />
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
						{
							flattenRoutes(navs).map((nav: any, index: number) => {
								return (
									<Route
										key={index}
										path={nav.path}
										element={
											<React.Suspense fallback={<>Loading...</>}>
												<nav.compName />
											</React.Suspense>
										}
									/>
								)

							})
						}
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
