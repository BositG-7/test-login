import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Box, Button, Flex, Paper, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { clearSession, setSession } from 'services/store';

import cursor from '../../assets/images/cursor.png';
import threeD from '../../assets/images/threeD.png';

import '../../assets/styles/login.scss';

interface LoginProps {}

const schema = yup.object({
	password: yup.string().min(1).label('Password').required()
});

function Login(props: LoginProps) {
	const form = useForm<{ password: string }>({
		initialValues: {
			password: ''
		},
		validate: yupResolver(schema)
	});
	const navigate = useNavigate();

	const onLogin = (par: { password: string }) => {
		if (par.password === 'Oybek') {
			notifications.show({ color: 'green', message: 'Success' });
			setSession(par.password);
			window.location.href = '/';
		} else {
			notifications.show({ color: 'red', message: 'wrong password' });
		}
	};

	useEffect(() => {
		clearSession();
	}, []);
	const [loading, setLoading] = useState(false);

	return (
		<Box h="90vh" w="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '200px' }}>
			<div className="right">
				<img src={cursor} alt="cursor" />
			</div>

			<form onSubmit={form.onSubmit(onLogin)}>
				<Paper bg="var(--paper-bg)" w={400}>
					<Flex direction="column" gap={20} align="center" p={20}>
						<Flex direction="column" gap={15} w="100%">
							<PasswordInput
								placeholder="Password"
								radius="sm"
								sx={{
									border: 'none'
								}}
								{...form.getInputProps('password')}
							/>

							<Button
								loading={loading}
								type="submit"
								sx={{
									borderRadius: '5px',
									color: 'rgba(0, 106, 255, 1)',
									height: '50px',
									backgroundColor: 'rgba(231, 240, 255, 1)',
									fontSize: '20px'
								}}>
								{loading ? 'Loading...' : 'Tizimga kirish'}
							</Button>
						</Flex>
					</Flex>
				</Paper>
			</form>
			<div className="left">
				<img src={threeD} alt="threeD" />
			</div>
		</Box>
	);
}

export default Login;
