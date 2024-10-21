import { Toaster } from '@/components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import PrivateRouteForNotAuth from './hoc/PrivateRouteForNotAuth'
import ProtectedRoute from './hoc/ProtectedRoute'
import Register from './pages/Register'

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
            </Routes>
            <Toaster />
        </>
    )
}

export default App
