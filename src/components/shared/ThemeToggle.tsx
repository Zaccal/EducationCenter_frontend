import { useTheme } from '@/providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'

function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            className="rounded-full w-10 h-10 p-0 "
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? <Moon /> : <Sun />}
        </Button>
    )
}

export default ThemeToggle
