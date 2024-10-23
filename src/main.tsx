import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TooltipProvider } from './components/ui/tooltip'
import './index.css'
import { ThemeProvider } from './providers/ThemeProvider'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="theme-mode">
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>
                        <App />
                    </TooltipProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)
