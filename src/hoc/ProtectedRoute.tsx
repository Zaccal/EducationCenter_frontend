import useAuth from '@/hook/useAuth'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import Loading from '@/pages/Loading'

const ProtectedRoute = () => {
    const { isAuth, isLoading, isError, isFetched, loadingPercentage } =
        useAuth()

    if ((isLoading && isError) || !isFetched) {
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
