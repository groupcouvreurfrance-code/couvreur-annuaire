import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, MessageSquare, Clock, TrendingUp } from "lucide-react"

interface AdminStatsProps {
  stats: {
    total_artisans: number
    pending_artisans: number
    approved_artisans: number
    total_requests: number
    new_requests: number
    requests_this_week: number
    total_departments: number
    total_communes: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: "Total Artisans",
      value: stats.total_artisans,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "En Attente",
      value: stats.pending_artisans,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Approuvés",
      value: stats.approved_artisans,
      icon: UserCheck,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Demandes Totales",
      value: stats.total_requests,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Nouvelles Demandes",
      value: stats.new_requests,
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Cette Semaine",
      value: stats.requests_this_week,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
