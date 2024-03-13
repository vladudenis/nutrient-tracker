import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import AuthContext from './AuthContext'
import ConvexClientProvider from './ConvexClientProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NutrientTracker',
    description: 'Nutrition Tracker',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthContext>
                    <ConvexClientProvider>
                        <Toaster position="top-center" reverseOrder={false} />
                        <Navbar />
                        {children}
                    </ConvexClientProvider>
                </AuthContext>
            </body>
        </html>
    )
}
