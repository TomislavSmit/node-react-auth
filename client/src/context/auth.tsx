import { createContext, useEffect, useState } from 'react'
import { fetchUser } from '../api/auth'
import Spinner from '../components/UI/Spinner'
import { IUser } from '../types/user'

interface AuthContextProps {
    user: IUser | null
    setUser: (user: IUser | null) => void
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const userData = await fetchUser()
                userData && setUser(userData?.user)
            } catch (error) {
                console.error('Failed to check authentication:', error)
            } finally {
                setLoading(false)
            }
        }

        verifyAuth()
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export default AuthContext
