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
            <body className="mt-20">{children}</body>
        </html>
    )
}
