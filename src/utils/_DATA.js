import * as React from 'react';
const Login = React.lazy(() => import('../pages/login/Login'));
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'));
const Analysis = React.lazy(() => import('../pages/dashboard/analysis/Analysis'));
const Monitor = React.lazy(() => import('../pages/dashboard/monitor/Monitor'));
const Workplace = React.lazy(() => import('../pages/dashboard/workplace/Workplace'));
const List = React.lazy(() => import('../pages/projects/list/List'));
const Details = React.lazy(() => import('../pages/projects/details/Details'));
const Settings = React.lazy(() => import('../pages/projects/settings/Settings'));
const Notfound = React.lazy(() => import('../pages/pageNotFound/PageNotFound'));

let navs = [
    {
        name: 'Login',
        compName: Login,
        locale: 'user.login',
        path: '/login',
        component: 'pages/login',
        hideInMenu: true,
    },
    {
        path: '/dashboard',
        locale: 'dashboard',
        name: 'Dashboard',
        compName: Dashboard,
        icon: 'dashboard',
        exact: true, // This route will only work for /dashboard . For /dashboard/analysis or other this component will not be rendered
        component: 'pages/dashboard',
        routes: [
            {
                path: '/dashboard/analysis',
                locale: 'dashboard.analysis',
                name: 'analysis',
                compName: Analysis,
                component: 'pages/dashboard/analysis',
                exact: true,
                accessTO: ['admin'] // Allow only admins to view this menu and access this page
            },
            {
                path: '/dashboard/monitor',
                locale: 'dashboard.monitor',
                component: 'pages/dashboard/monitor',
                name: 'monitor',
                compName: Monitor,
                exact: true,
            },
            {
                path: '/dashboard/workplace',
                locale: 'dashboard.workplace',
                component: 'pages/dashboard/workplace',
                name: 'workplace',
                compName: Workplace,
                exact: true,
            },
        ],
    },
    {
        path: '/projects',
        locale: 'projects',
        name: 'Projects',
        compName: List,
        icon: 'projects',
        redirect: '/projects/list', //Redirect /projects to /projects/list
        routes: [
            {
                path: '/projects/list',
                locale: 'projects.list',
                name: 'Projects',
                compName: List,
                component: 'pages/projects/list',
                icon: 'projects',
                exact: true,
            },
            {
                path: '/projects/:id',
                locale: 'projects.details',
                name: 'Project Details',
                compName: Details,
                component: 'pages/projects/details',
                icon: 'details',
                key: 'details',
                exact: true,
            },
            {
                path: '/projects/:id/settings',
                locale: 'projects.settings',
                icon: 'settings',
                name: 'Settings',
                compName: Settings,
                component: 'pages/projects/details',
                parentKey: 'details',
                exact: true,
            },
        ],
    },
    {
        path: '*',
        compName: Notfound,
        component: 'pages/pageNotFound',
    },
]

export function _getNavs() {
    return new Promise((resolve) => {
        resolve({...navs})
    })
}