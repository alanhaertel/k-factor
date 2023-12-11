import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'K Friction Factor',
    description: 'Calculate k friction factor. Developed by Alan Haertel'
}

export default function RootLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className= {`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster/>
                </ThemeProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}
