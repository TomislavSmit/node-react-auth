import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import Layout from '../components/layout/Layout'
import AuthContext from '../context/auth'
import { useForm } from 'react-hook-form'
import Button from '../components/UI/Button'
import InputError from '../components/UI/InputError'
import Input from '../components/UI/Input'
import InputLabel from '../components/UI/InputLabel'
import { IUser } from '../types/user'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm()
    const { user, setUser } = useContext(AuthContext)

    if (user) {
        return <Navigate to='/' />
    }

    const onSubmit = async () => {
        try {
            const response: { user: IUser } = await loginUser({
                email,
                password,
            })
            setUser(response.user)
        } catch (error) {
            setError('errorLoggingIn', {
                type: 'server',
                message: 'Wrong email or password',
            })
        }
    }
    return (
        <Layout>
            <div className='d-flex justify-content-center mx-auto'>
                <div className='w-full max-w-xs mx-auto'>
                    <form
                        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className='mb-4'>
                            <InputLabel text='Email' htmlFor='email' />
                            <Input
                                register={register}
                                id='email'
                                type='text'
                                placeholder='Email'
                                value={email}
                                {...register('email', {
                                    required: "Email can't be blank",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <InputError
                                    message={errors.email.message as string}
                                />
                            )}
                        </div>
                        <div className='mb-6'>
                            <InputLabel text='Password' htmlFor='password' />
                            <Input
                                register={register}
                                id='password'
                                type='password'
                                placeholder='*******'
                                value={password}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must be at least 6 characters',
                                    },
                                })}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <InputError
                                    message={errors.password.message as string}
                                />
                            )}
                        </div>
                        <div>
                            <Button type='submit' className='w-full'>
                                Log in
                            </Button>
                        </div>
                        {errors.errorLoggingIn && (
                            <InputError
                                message={
                                    errors.errorLoggingIn.message as string
                                }
                            />
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default LoginPage
