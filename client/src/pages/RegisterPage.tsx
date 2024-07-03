import { useContext, useState } from 'react'
import { registerUser } from '../api/auth'
import Layout from '../components/layout/Layout'
import AuthContext from '../context/auth'
import { Navigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import Button from '../components/UI/Button'
import InputError from '../components/UI/InputError'
import Input from '../components/UI/Input'
import InputLabel from '../components/UI/InputLabel'
import { IUser } from '../types/user'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const { user, setUser } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        mode: 'onSubmit',
    })

    if (user) {
        return <Navigate to='/' />
    }

    const onSubmit = async (formData: any) => {
        try {
            const { error, user }: { error: any; user: IUser } =
                await registerUser(formData)

            if (error) {
                Object.keys(error.errors).forEach((field) => {
                    setError(field, {
                        type: 'server',
                        message: error.errors[field].message,
                    })
                })

                return error
            }

            if (user) {
                setUser(user)
            }
        } catch (error: any) {
            setError('errorRegistering', {
                type: 'server',
                message: error.response.data.message,
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
                        onChange={() => clearErrors()}
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
                        <div className='mb-4'>
                            <InputLabel text='Password' htmlFor='password' />
                            <Input
                                register={register}
                                id='password'
                                type='password'
                                placeholder='******************'
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
                        <div className='mb-4'>
                            <InputLabel text='First Name' htmlFor='firstName' />
                            <Input
                                register={register}
                                id='firstName'
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                {...register('firstName', {
                                    required: 'First name is required',
                                })}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && (
                                <InputError
                                    message={errors.firstName.message as string}
                                />
                            )}
                        </div>
                        <div className='mb-4'>
                            <InputLabel text='Last Name' htmlFor='lastName' />
                            <Input
                                register={register}
                                id='lastName'
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                {...register('lastName', {
                                    required: 'Last name is required',
                                })}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && (
                                <InputError
                                    message={errors.lastName.message as string}
                                />
                            )}
                        </div>
                        <div>
                            <Button type='submit' className='w-full'>
                                Register
                            </Button>
                        </div>
                        {errors.errorRegistering && (
                            <InputError
                                message={
                                    errors.errorRegistering.message as string
                                }
                            />
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default RegisterPage
