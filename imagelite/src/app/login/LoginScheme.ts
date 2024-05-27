import * as Yup from 'yup';

export interface LoginForm {
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const formScheme: LoginForm = {
    name: '',
    email: '',
    password: '',
    passwordMatch: ''
};

export const ValidationScheme = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().trim().email('Email inválido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'As senhas não coincidem')
});