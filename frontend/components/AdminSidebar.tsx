import { Users, Activity, Settings, Database, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: '概览',
      icon: LayoutDashboard
    },
    {
      id: 'users',
      label: '用户管理',
      icon: Users
    },
    {
      id: 'workflow',
      label: '工作流管理',
      icon: Activity
    },
    {
      id: 'system',
      label: '系统设置',
      icon: Settings
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 pt-16">
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeTab === item.id
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn(
                  "mr-3 h-5 w-5",
                  activeTab === item.id ? "text-purple-700" : "text-gray-400 group-hover:text-gray-500"
                )} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
