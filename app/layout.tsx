import '../styles/globals.css'
import React from 'react'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />

            <body>
                <div className="top-0 w-full h-8 bg-[#660015]" />
                {children}
            </body>
        </html>
    )
}
