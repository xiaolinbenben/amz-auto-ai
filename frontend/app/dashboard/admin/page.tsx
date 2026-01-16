'use client'

import { useState, useEffect } from 'react'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { motion } from 'framer-motion'
import { Shield, Users, Database, Settings, Activity, RefreshCw, Search, MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  username: string
  created_at: string
  status: 'active' | 'inactive' | 'banned'
}

interface SystemStats {
  total_users: number
  active_users: number
  total_apps: number
  system_status: 'healthy' | 'warning' | 'error'
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<SystemStats>({
    total_users: 0,
    active_users: 0,
    total_apps: 0,
    system_status: 'healthy',
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      // 获取用户列表
      const usersResponse = await fetch('http://localhost:8000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData.data || [])
        
        // 获取统计数据
        setStats({
          total_users: usersData.data?.length || 0,
          active_users: usersData.data?.filter((u: User) => u.status === 'active').length || 0,
          total_apps: 0, // 需要从其他接口获取
          system_status: 'healthy',
        })
      } else {
        toast.error('获取管理员数据失败')
      }
    } catch (error) {
      console.error('获取管理员数据失败:', error)
      toast.error('获取管理员数据失败')
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:8000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast.success('操作成功')
        await fetchAdminData()
      } else {
        toast.error('操作失败')
      }
    } catch (error) {
      console.error('操作失败:', error)
      toast.error('操作失败')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
      case 'banned':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'inactive':
        return <Clock className="w-4 h-4" />
      case 'banned':
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            管理员后台
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            系统管理与监控
          </p>
        </div>
        <AnimatedButton
          variant="outline"
          onClick={fetchAdminData}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          刷新
        </AnimatedButton>
      </div>

      {/* 系统统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MagicCard className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">总用户数</p>
              <p className="text-3xl font-bold">{stats.total_users}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </MagicCard>

        <MagicCard className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">活跃用户</p>
              <p className="text-3xl font-bold">{stats.active_users}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </MagicCard>

        <MagicCard className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">应用总数</p>
              <p className="text-3xl font-bold">{stats.total_apps}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
              <Database className="h-6 w-6" />
            </div>
          </div>
        </MagicCard>

        <MagicCard className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">系统状态</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">正常运行</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
              <Shield className="h-6 w-6" />
            </div>
          </div>
        </MagicCard>
      </div>

      {/* 用户管理 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <Users className="mr-2 h-5 w-5" />
            用户管理
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <MagicCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      用户
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      邮箱
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      注册时间
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {user.username}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                          {getStatusIcon(user.status)}
                          <span>{user.status === 'active' ? '活跃' : user.status === 'inactive' ? '未激活' : '封禁'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.created_at).toLocaleString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <AnimatedButton
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {}}
                          >
                            <Edit className="h-4 w-4" />
                          </AnimatedButton>
                          <AnimatedButton
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => handleUserAction(user.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </AnimatedButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MagicCard>
        )}
      </div>
    </div>
  )
}
