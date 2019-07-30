// Include Profiles Section 
import InboxIcon from '../../icons/round-email-24px.svg';
import MyDataIcon from '../../icons/round-timeline-24px.svg';
import ResourcesIcon from '../../icons/round-folder-24px.svg';
import DashboardIcon from '../../icons/round-home-24px.svg';
import ProfileIcon from '../../icons/round-person-24px.svg';
import MyPatientsIcon from '../../icons/round-people-24px.svg';

export const modules = [
    {
        name: 'Dashboard', 
        roles: null,
        content: {
            icon: DashboardIcon,
        },
        link: '/dashboard',
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
            icon: InboxIcon, 
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
            icon: MyDataIcon,
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
            icon: ResourcesIcon,
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
            icon: MyPatientsIcon, 
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
            icon: ProfileIcon,
        },
        link: '/dashboard/profile'
    }

]