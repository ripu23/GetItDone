import { Constants } from '../Models/constants';

export const userPages = [
    {
        title: 'Account',
        url: '/profile/account'
    },
    {
        title: 'History',
        url: '/profile/history',
        children: [
            {
                title: 'Open Request',
                url: '/profile/openrequest-user'
            },
            {
                title: 'Requests in progress',
                url: '/profile/account'
            },
            {
                title: 'Completed Requests',
                url: '/profile/in-progress-request-user'
            }
        ]
    }
];

export const volunteerPages = [
    {
        title: 'Account',
        url: '/profile/account'
    },
    {
        title: 'History',
        url: '/profile/history'
    },
    {
        title: 'Requests',
        url: '/profile/requests'
    }
];

export const pages = [
    {
        title: 'Account',
        url: '/profile/account'
    },
    {
        title: 'Create Request',
        url: '/map'
    },
    {
        title: 'Pending Requests',
        url: '/profile/requests/' + Constants.STATUS_NOT_DONE
    },
    {
        title: 'In-Progress Requests',
        url: '/profile/requests/' + Constants.STATUS_IN_PROGRESS
    },
    {
        title: 'Completed Requests',
        url: '/profile/requests/' + Constants.STATUS_DONE
    },
];
