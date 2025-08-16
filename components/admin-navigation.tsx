"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin/artisans", label: "Artisans", icon: Users },
]

export function AdminNavigation() {
  const pathname = usePathname()

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2",
                  isActive ? "bg-amber-600 hover:bg-amber-700" : "bg-white hover:bg-slate-50",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
