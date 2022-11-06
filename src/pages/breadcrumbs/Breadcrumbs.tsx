import './Breadcrumbs.css';
import { Link } from "react-router-dom";

function Breadcrumbs(props: any) {

    return (
        <div className='breadcrumbs header'>
            {
                props.navs !== null ? Object.keys(props.navs)
                    .filter((nav) => { return props.navs[nav].name ? nav : null })
                    .map((nav, index) => {
                        return ((props.navs[nav].routes && window.location.pathname.includes(props.navs[nav].path)) &&
                            <div
                                className='breadcrumb'
                                key={index}
                            >
                                <div className=''>
                                    {
                                        (
                                            props.navs[nav].icon && <img src={`/images/${props.navs[nav].icon}.png`} alt={props.navs[nav].name} className='icon' />
                                        )
                                    }
                                    <Link to={props.navs[nav].path} className={window.location.pathname === (props.navs[nav].path) ? '' : 'active'}>{props.navs[nav].name}</Link>
                                </div>
                                {
                                    (props.navs[nav].routes && props.navs[nav].routes.length) ? Object.keys(props.navs[nav].routes).map((nestedNavs, index) => {
                                        return (window.location.pathname === (props.navs[nav].routes[nestedNavs].path) &&
                                            <div
                                                className='breadcrumb'
                                                key={index}
                                            >
                                                <div className=''>
                                                    <p className='arrow'></p>
                                                    {
                                                        (
                                                            props.navs[nav].routes[nestedNavs].icon && <img src={`/images/${props.navs[nav].routes[nestedNavs].icon}.png`} alt={props.navs[nav].routes[nestedNavs].name} className='icon' />
                                                        )
                                                    }
                                                    <span>{props.navs[nav].routes[nestedNavs].name}</span>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        )
                    }) : null
            }
        </div>
    );
}

export default Breadcrumbs;
