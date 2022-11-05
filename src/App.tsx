import './App.css';
import { _getNavs } from './utils/_DATA.js';
import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';

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
		debugger
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
			<Sidebar navs={navs} mouseEnter={mouseEnter} mouseLeave={mouseLeave} />
		</div>
	);
}

export default App;
