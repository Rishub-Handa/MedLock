// Include Profiles Section 

export const modules = [
    {
        name: 'Dashboard', 
        roles: null,
        link: '/dashboard' 
    }, 
    {
        name: 'Inbox', 
        roles: [
            {
                name: 'Provider', 
                description: 'Access messages from patients and other providers'
            }, 
            {
                name: 'Patient', 
                description: 'Access messages from my providers '
            }
        ], 
        content: {
            image: '', 
        },
        link: '/dashboard/inbox'
    },
    {
        name: 'My Data',
        roles: [
            {
                name: 'Patient', 
                description: 'Track my medication consumption and pain management '
            }
        ], 
        content:  {
            image: '',
        },
        link: '/dashboard/mydata'
    },
    {
        name: 'Resources',
        roles: [
            {
                name: 'Provider', 
                description: 'View resources on the latest opioid regulations '
            }, 
            {
                name: 'Patient', 
                description: 'View resources to help maintain sobriety '
            }
        ],  
        content: {
            image: '',
        },
        link: '/dashboard/resources'
    }, 
    {
        name: 'My Patients', 
        roles: [
            {
                name: 'Provider', 
                description: 'View a list of all your patients ' 
            }
        ], 
        content: {
            image: '', 
        }, 
        link: '/dashboard/mypatients' 
    },
    {
        name: 'Profile',
        roles: [
            {
                name: 'Patient',
                description: 'View and edit your profile '
            },
            {
                name: 'Provider',
                description: 'View and edit your profile '
            }
        ],
        content: {
            image: '',
        },
        link: '/dashboard/profile'
    }

]