import useAuth from '@/hook/useAuth'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import Loading from '@/pages/Loading'
import PageError from '@/pages/PageError'

const ProtectedRoute = () => {
    const { isAuth, isLoading, isError, isFetched, loadingPercentage, error } =
        useAuth()

    if ((isLoading && isError) || !isFetched) {
        if (isError) {
            return (
                <PageError
                    code={error?.status}
                    message={error?.message || 'Попробуите позже'}
                />
            )
        }

        return <Loading percentage={loadingPercentage} />
    }

    return isAuth ? (
        <Layout>
            <Dashboard />
        </Layout>
    ) : (
        <Home />
    )
}

export default ProtectedRoute
