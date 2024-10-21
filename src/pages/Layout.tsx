import Header from '@/components/shared/Header'
import { ReactElement } from 'react'

interface ILayout {
    children: ReactElement | ReactElement[]
}

const Layout = ({ children }: ILayout) => {
    return (
        <>
            <Header className="bg-primary text-primary-foreground" />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    )
}

export default Layout
