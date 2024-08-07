import './globals.css'
import '@mantine/core/styles.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopNavbar from '../components/navbars/TopNavbar'
import SideNavbar from '@/components/navbars/SideNavbar'
import AuthContext from './AuthContext'
import ConvexClientProvider from './ConvexClientProvider'
import { Toaster } from 'react-hot-toast'
import { getServerSession } from 'next-auth'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

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
    const session = await getServerSession()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>Nutrient Tracker</title>
                <ColorSchemeScript />
            </head>
            <body className={inter.className}>
                <MantineProvider>
                    <AuthContext>
                        <ConvexClientProvider>
                            <Toaster
                                position="top-center"
                                reverseOrder={false}
                            />
                            {session ? <SideNavbar /> : <TopNavbar />}
                            {children}
                        </ConvexClientProvider>
                    </AuthContext>
                </MantineProvider>
            </body>
        </html>
    )
}
