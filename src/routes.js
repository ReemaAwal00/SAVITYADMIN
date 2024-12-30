import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';


// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Volunteer from 'views/admin/volunteer';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Resources',
    layout: '/admin',
    path: '/resource',
    icon: (
      <Icon
        as={MdPerson}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Total members ',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Quiz Data',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
 
  
  {
    name: 'Volunteer',
    layout: '/admin',
    path: '/volunteer',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Volunteer />,
  },

  {
    name: 'Log Out',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
];

export default routes;
