import '@styles/globals.css';

import Nav from '@components/Nav';

export const metadata = {
    title: "Conteúdos",
    description: "Adicione conteúdos ao seu robô"
}

const RootLayout = ({ children }) => {
  return (
    <html Lang="pt-br">
        <body>
            <div className="main">
                <div className="gradient" />
            </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
        </body>
    </html>
  )
}

export default RootLayout