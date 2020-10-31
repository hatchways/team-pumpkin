import { lazy } from 'react';

const SignUpScreen = lazy(() => import('../src/pages/SignUp/SignUp'));
const LoginScreen = lazy(() => import('../src/pages/Login/Login'));
const HomeScreen = lazy(() => import('../src/pages/Home/Home'));
const PollFrameScreen = lazy(() => import('../src/components/PollFrame/PollFrame'));

export { SignUpScreen, LoginScreen, HomeScreen, PollFrameScreen };
