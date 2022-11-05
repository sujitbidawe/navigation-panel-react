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
                                className={window.location.pathname.includes(props.navs[nav].path) ? 'nav active' : 'nav'}
                                key={index}
                                onMouseEnter={(e) => { props.mouseEnter(index) }}
                                onMouseLeave={(e) => { props.mouseLeave(index) }}
                                onClick={(e) => { e.stopPropagation(); props.routeclicked(props.navs[nav]) }}
                            >
                                {props.navs[nav].name}
                                {
                                    (props.navs[nav].routes && props.navs[nav].routes.length && props.navs[nav].isHover) ? Object.keys(props.navs[nav].routes).map((nestedNavs, index) => {
                                        return (
                                            <div
                                                className={window.location.pathname.includes(props.navs[nav].routes[nestedNavs].path) ? 'nested-nav active' : 'nested-nav'}
                                                key={index}
                                                onClick={(e) => { e.stopPropagation(); props.routeclicked(props.navs[nav].routes[nestedNavs]) }}
                                            >
                                                {props.navs[nav].routes[nestedNavs].name}
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
