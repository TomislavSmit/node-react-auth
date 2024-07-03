import { ReactNode, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth'
import { logout } from '../../api/auth'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const { user, setUser } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mx-auto justify-content-center'>
            <div className=''>
                <nav className='flex'>
                    <NavLink
                        to='/'
                        className='p-4 mr-6 text-blue-500 hover:text-blue-800'
                    >
                        Home
                    </NavLink>
                    {!user && (
                        <>
                            <NavLink
                                to='/register'
                                className='p-4 mr-6 text-blue-500 hover:text-blue-800'
                            >
                                Register
                            </NavLink>
                            <NavLink
                                to='/login'
                                className='p-4 mr-6 text-blue-500 hover:text-blue-800'
                            >
                                Login
                            </NavLink>
                        </>
                    )}
                    {user && (
                        <NavLink
                            to='#'
                            className='p-4 mr-6 text-blue-500 hover:text-blue-800'
                            onClick={handleLogout}
                        >
                            Logout
                        </NavLink>
                    )}
                </nav>
            </div>
            <main className='m-4'>{children}</main>
        </div>
    )
}

export default Layout
