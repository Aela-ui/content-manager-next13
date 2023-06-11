import '@styles/globals.css';

import Nav from '@components/Nav';
import { AuthProvider } from './contexts/authContext';

export const metadata = {
    title: "Conteúdos",
    description: "Adicione conteúdos ao seu robô"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="pt-br">
            <body>
                <AuthProvider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                        <main className="app">
                            <Nav />
                            {children}
                        </main>
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout