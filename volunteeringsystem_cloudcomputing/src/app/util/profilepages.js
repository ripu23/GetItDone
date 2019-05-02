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