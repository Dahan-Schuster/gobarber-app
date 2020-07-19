import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
	Image,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Toast from 'react-native-simple-toast';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
	Container,
	Title,
	ForgotPassword,
	ForgotPasswordText,
	CreateAccountButton,
	CreateAccountButtonText,
} from './styles';
import { colors } from '../../styles';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const inputPasswordRef = useRef<TextInput>(null);
	const { signIn } = useAuth();

	const [showCreateAccount, setShowCreateAccount] = useState(true);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => {
			setShowCreateAccount(false);
		});

		Keyboard.addListener('keyboardDidHide', () => {
			setShowCreateAccount(true);
		});
	}, []);

	const handleSignIn = useCallback(
		async (data: SignInFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Informe seu email')
						.email('Email inválido'),
					password: Yup.string().required('Informe sua senha'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn(data);
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);

					Toast.show('Email ou senha inválidos');
					return;
				}

				Toast.show('Erro na autenticação. Tente novamente.');
			}
		},
		[signIn],
	);

	return (
		<>
			<KeyboardAvoidingView
				enabled
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}
				>
					<Container>
						<Image source={logoImg} />
						<View>
							<Title>Faça seu logon</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignIn}>
							<Input
								name="email"
								icon="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={
									inputPasswordRef.current?.focus
								}
							/>
							<Input
								ref={inputPasswordRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={formRef.current?.submitForm}
							/>

							<Button onPress={formRef.current?.submitForm}>
								Entrar
							</Button>
						</Form>

						<ForgotPassword
							onPress={() => {
								console.log('yo');
							}}
						>
							<ForgotPasswordText>
								Esqueci minha senha
							</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>
			{showCreateAccount && (
				<CreateAccountButton
					onPress={() => navigation.navigate('SignUp')}
				>
					<Icon name="log-in" size={20} color={colors.primary} />
					<CreateAccountButtonText>
						Criar uma conta
					</CreateAccountButtonText>
				</CreateAccountButton>
			)}
		</>
	);
};

export default SignIn;
