import { useContext } from 'react'
import Layout from '../components/layout/Layout'
import AuthContext from '../context/auth'

const HomePage = () => {
    const { user } = useContext(AuthContext)

    return (
        <Layout>
            <h1>Welcome {user?.fullName}</h1>
        </Layout>
    )
}

export default HomePage
