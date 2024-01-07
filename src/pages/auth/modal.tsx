import { useState } from 'react';
import * as yup from 'yup';
import { Button, Flex, Modal, Paper, PasswordInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getSession, setSession } from 'services';

const schema = yup.object({
	password: yup.string().min(1).label('Password').required()
});

export default function Demo() {
	const [opened, { open, close }] = useDisclosure(false);
	const user = getSession();

	const [loading, setLoading] = useState(false);

	const handleOpenModal = () => {
		// Bu funksiya avtorizatsiyadan otmagan bo'lsa, modalni ochadi
		// Siz o'zingizning avtorizatsiya tekshiringi yoki avtorizatsiya holatini ushbu funksiyaga o'tkazing
		// Agar foydalanuvchi avtorizatsiyadan otmagan bo'lsa, modalni ochishga ruxsat etiladi
		if (!user) {
			open();
		}
	};
	const form = useForm<{ password: string }>({
		initialValues: {
			password: ''
		},
		validate: yupResolver(schema)
	});

	const onLogin = (par: { password: string }) => {
		if (par.password === 'Oybek') {
			notifications.show({ color: 'green', message: 'Success' });
			setSession(par.password);
			window.location.href = '/';
		} else {
			notifications.show({ color: 'red', message: 'wrong password' });
		}
	};

	return (
		<>
			<Modal opened={opened} onClose={close} title="Authentication">
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
			</Modal>

			<Button onClick={handleOpenModal}>Kirish</Button>
		</>
	);
}
