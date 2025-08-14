// app/sign-out/page.tsx
'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
    const { signOut } = useClerk()
    const router = useRouter()

    useEffect(() => {
        const handleSignOut = async () => {
            try {
                await signOut()
                router.push('/')
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error)
                router.push('/')
            }
        }

        handleSignOut()
    }, [signOut, router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Déconnexion en cours...</p>
        </div>
    )
}