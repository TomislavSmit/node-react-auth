import { IUser, IUserLogin } from '../types/user'
import { axiosInstance } from './config'

// TODO: add TS types for consistent response

const registerUser = async (
    data: IUser
): Promise<{ error: any; user: IUser }> => {
    try {
        const response = await axiosInstance.post('/register', data)

        return response.data
    } catch (error) {
        throw error
    }
}

const loginUser = async (
    data: IUserLogin
): Promise<{ error: any; user: IUser }> => {
    try {
        const response = await axiosInstance.post('/login', data)

        return response.data
    } catch (error) {
        throw error
    }
}

const fetchUser = async (): Promise<{ erorr: any; user: IUser } | null> => {
    try {
        const { data } = await axiosInstance.get('/user')
        return data || null
    } catch (error) {
        throw error
    }
}

const logout = async (): Promise<{ erorr: any; user: IUser } | null> => {
    try {
        const response = await axiosInstance.get('/logout')
        return response.data
    } catch (error) {
        throw error
    }
}

export { registerUser, loginUser, fetchUser, logout }
