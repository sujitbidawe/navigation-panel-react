import './Sidebar.css';

function Sidebar(props: any) {

    return (
        <div className='sidebar'>
            {
                props.navs !== null ? Object.keys(props.navs)
                    .filter((nav) => { return props.navs[nav].name ? nav : null })
                    .map((nav, index) => {
                        return (
                            <div
                                className={window.location.pathname.includes(props.navs[nav].path) ? 'nav active-option' : 'nav'}
                                key={index}
                                onMouseEnter={(e) => { props.mouseEnter(index) }}
                                onMouseLeave={(e) => { props.mouseLeave(index) }}
                                onClick={(e) => { e.stopPropagation(); props.routeClicked(props.navs[nav]) }}
                            >
                                <div className='nav-details'>
                                    {
                                        (
                                            props.navs[nav].icon && <img src={`/images/${props.navs[nav].icon}.png`} alt={props.navs[nav].name} className='icon' />
                                        )
                                    }
                                    <span>{props.navs[nav].name}</span>
                                </div>
                                {
                                    (props.navs[nav].routes && props.navs[nav].routes.length && props.navs[nav].isHover) ? Object.keys(props.navs[nav].routes).map((nestedNavs, index) => {
                                        return (
                                            <div
                                                className={window.location.pathname === (props.navs[nav].routes[nestedNavs].path) ? 'nested-nav active-option' : 'nested-nav'}
                                                key={index}
                                                onClick={(e) => { e.stopPropagation(); props.routeClicked(props.navs[nav].routes[nestedNavs]) }}
                                            >
                                                <div className='nav-details'>
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

export default Sidebar;
