"use client"
import React, { useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'

const ScrollToBottom = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset
            const isAtBottom = scrolled + window.innerHeight >= document.documentElement.scrollHeight - 10

            // Afficher le bouton si on a scrollé plus de 200px et qu'on n'est pas en bas
            setShowButton(scrolled > 200 && !isAtBottom)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
    }

    if (!showButton) return null

    return (
        <button
            onClick={scrollToBottom}
            className="fixed bottom-20 right-6 z-40 bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Aller en bas de page"
        >
            <ArrowDown className="h-6 w-6" />
        </button>
    )
}

export default ScrollToBottom