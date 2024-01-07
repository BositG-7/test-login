import { FunctionComponent } from 'react';
import { Button } from '@mantine/core';
import { clearSession, getSession } from 'services';

import Demo from './auth/modal';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const user = getSession();

	return (
		<>
			{!user ? (
				<>
					<h1>Hello Hush kelibsiz</h1>

					<Demo />
				</>
			) : (
				<>
					<h1>Hello Oybek</h1>
					<Button
						bg="red"
						onClick={() => {
							clearSession();
							window.location.href = '/';
						}}>
						Logout
					</Button>
				</>
			)}
		</>
	);
};

export default Home;
