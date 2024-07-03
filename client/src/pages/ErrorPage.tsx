import Layout from '../components/layout/Layout'

interface ErrorPageProps {}

const ErrorPage = ({}: ErrorPageProps) => {
    return (
        <Layout>
            <h1>Oops!</h1>
            <p>Something went wrong.</p>
        </Layout>
    )
}

export default ErrorPage
