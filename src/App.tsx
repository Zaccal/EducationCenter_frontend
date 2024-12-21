import { Toaster } from '@/components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import PrivateRouteForNotAuth from './hoc/PrivateRouteForNotAuth'
import ProtectedRoute from './hoc/ProtectedRoute'
import Layout from './pages/Layout'
import PageError from './pages/PageError'
import Register from './pages/Register'
import Video from './pages/Video'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoute />} />
                <Route
                    path="/register"
                    element={
                        <PrivateRouteForNotAuth>
                            <Register />
                        </PrivateRouteForNotAuth>
                    }
                />

                <Route
                    path="/video/:topicId/:lessonId"
                    element={
                        <Layout>
                            <Video />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <PageError />
                        </Layout>
                    }
                />
            </Routes>
            <Toaster />
        </>
    )
}

export default App
