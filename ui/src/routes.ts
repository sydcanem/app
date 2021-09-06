import App from './App';
import { Login } from './screens/Login';

export let routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: App,
    exact: false,
  },
];
