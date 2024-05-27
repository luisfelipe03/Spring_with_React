'use client';

import {Button, InputText, RenderIf, Template, FieldError, useNotification} from '@/components';
import {useState} from 'react';
import {LoginForm, ValidationScheme, formScheme} from './LoginScheme';
import {useFormik} from 'formik';
import { useAuth } from '@/resources';
import { useRouter } from 'next/navigation';
import { AccessToken, Credentials } from '@/resources/user/users.resources';

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);
    
    const auth = useAuth();
    const router = useRouter();
    const notification = useNotification();

    const { values, handleChange, handleSubmit, errors } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: ValidationScheme,
        onSubmit: onSubmit,
    });

    async function onSubmit(values: LoginForm) {
        if(!newUserState) {
            setLoading(true);
            const credentials: Credentials = {email: values.email, password: values.password}
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                router.push('/galeria');
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, 'error');
            } finally {
                setLoading(false);
            }
        }
    }
    
    return (
        <div>
            <Template loading={loading}>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8'>
                    
                
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                        <h2 className='text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                            {
                                newUserState ? 'Cadastro' : 'Login'
                            }
                        </h2>
                    </div>

                    <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <form onSubmit={handleSubmit} className='space-y-2'>
                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Nome: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                               id='name' 
                                               placeholder='Nome'
                                               value={values.name}
                                               onChange={handleChange} />
                                    <FieldError error={errors.name} />
                                </div>
                            </RenderIf>
                            <div>
                                <label className='block text-s font-medium leading-6 text-gray-900'>Email: *</label>
                            </div>
                            <div className='mt-2'>
                                <InputText style='w-full' 
                                            id='email' 
                                            placeholder='Email'
                                            value={values.email}
                                            onChange={handleChange} />
                                <FieldError error={errors.email} />
                            </div>
                            <div>
                                <label className='block text-s font-medium leading-6 text-gray-900'>Senha: *</label>
                            </div>
                            <div className='mt-2'>
                                <InputText style='w-full' 
                                            id='password' 
                                            placeholder='Senha'
                                            type='password'
                                            value={values.password}
                                            onChange={handleChange} />
                                <FieldError error={errors.password} />
                            </div>
                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className='block text-s font-medium leading-6 text-gray-900'>Repita a senha: *</label>
                                </div>
                                <div className='mt-2'>
                                    <InputText style='w-full' 
                                                id='passwordMatch' 
                                                placeholder='Digite novamente a senha'
                                                type='password'
                                                value={values.passwordMatch}
                                                onChange={handleChange} />
                                    <FieldError error={errors.passwordMatch} />
                                </div>
                            </RenderIf>
                                <div className='mt-5'>
                                    <RenderIf condition={newUserState}>
                                        <Button type='submit' 
                                                style='bg-indigo-500 hover:bg-indigo-700' 
                                                label='Salvar' />

                                        <Button type='button' 
                                                onClick={event => setNewUserState(false)} 
                                                style='ml-2 bg-red-600 hover:bg-red-500' 
                                                label='Cancelar'/>
                                    </RenderIf>

                                    <RenderIf condition={!newUserState}>
                                        <Button type='submit' 
                                                style='bg-indigo-500 hover:bg-indigo-700' 
                                                label='Entrar'/>

                                        <Button type='button' 
                                                onClick={event => setNewUserState(true)} 
                                                style='mb-10 ml-2 bg-green-600 hover:bg-green-500' 
                                                label='Cadastrar'/>
                                    </RenderIf>
                                </div>
                            </form>
                    </div>
                </div>
            </Template>
        </div>
    )
}