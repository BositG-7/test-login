import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { Auth } from 'pages';
import Home from 'pages/home';
import { getSession } from 'services';

import AuthProtected from './auth-protected';

const Routes = () => {
	const user = getSession();

	console.log(user);

	return (
		<Switch>
			<Route path="" element={<Home />} />

			<Route path="auth" element={<AuthProtected allowed={!user} redirectURL="/" />}>
				<Route path="login" element={<Auth.Login />} />

				<Route path="*" index element={<Navigate to="/auth/login" />} />
			</Route>

			<Route path="*" element={<Navigate to={user ? '/' : '/auth/login'} />} />
		</Switch>
	);
};

export default Routes;
