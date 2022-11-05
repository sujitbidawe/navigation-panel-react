import './App.css';
import { _getNavs } from './utils/_DATA.js';
import { useState, useEffect } from 'react';
import Sidebar from './pages/sidebar/Sidebar';
import Login from './pages/login/Login';

function App() {

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

	return (
		<div className="App">
			<div className='header'>
				<h3>breadCrumb1</h3>
				<h3>breadCrumb2</h3>
				<h3>breadCrumb3</h3>
			</div>
			<div className='container'>
				<Sidebar navs={navs} mouseEnter={mouseEnter} mouseLeave={mouseLeave} />
				<div className='right-container'>
					<Login />
				</div>
			</div>
		</div>
	);
}

export default App;
