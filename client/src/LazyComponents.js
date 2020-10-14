import { lazy } from 'react';

const SignUpScreen = lazy(() => import('../src/pages/SignUp/SignUp'));
const LoginScreen = lazy(() => import('../src/pages/Login/Login'));

export { SignUpScreen, LoginScreen };
