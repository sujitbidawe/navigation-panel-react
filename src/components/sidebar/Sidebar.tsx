import './Sidebar.css';

function Sidebar(props: any) {

    return (
        <div className='sidebar'>
            {
                props.navs !== null ? Object.keys(props.navs)
                    .filter((nav) => { return props.navs[nav].name ? nav : null })
                    .map((nav, index) => {
                        return (
                            <nav className='nav' key={index}
                                onMouseEnter={(e) => { props.mouseEnter(index) }}
                                onMouseLeave={(e) => { props.mouseLeave(index) }}
                            >
                                {props.navs[nav].name}
                                {
                                    (props.navs[nav].routes && props.navs[nav].routes.length && props.navs[nav].isHover) ? Object.keys(props.navs[nav].routes).map((nestedNavs, index) => {
                                        return (
                                            <nav className='nested-nav' key={index}>
                                                {props.navs[nav].routes[nestedNavs].name}
                                            </nav>
                                        )
                                    }) : null
                                }
                            </nav>
                        )
                    }) : null
            }
        </div>
    );
}

export default Sidebar;