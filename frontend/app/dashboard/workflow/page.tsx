'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { motion } from 'framer-motion'
import { Plus, Settings, ChevronRight, Edit, Workflow as WorkflowIcon, ExternalLink, RefreshCw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DifyApp {
  id: string
  name: string
  description: string
  mode: string
  created_at: string
  updated_at: string
}

export default function WorkflowListPage() {
  const router = useRouter()
  const [apps, setApps] = useState<DifyApp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDifyApps()
  }, [])

  const fetchDifyApps = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/dify/apps', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setApps(data.data || [])
      } else {
        console.error('获取 Dify 应用失败')
        // 模拟数据用于展示
        setApps([])
      }
    } catch (error) {
      console.error('获取 Dify 应用失败:', error)
      setApps([])
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDify = (appId: string) => {
    // 在新标签页打开 Dify 工作流编辑器
    const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
    window.open(`${difyUrl}/app/${appId}/workflow`, '_blank')
  }

  const handleCreateApp = () => {
    // 在新标签页打开 Dify 创建页面
    const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
    window.open(`${difyUrl}/apps`, '_blank')
  }

  const handleOpenDifyHome = () => {
    const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
    window.open(difyUrl, '_blank')
  }

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'workflow':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'chatbot':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'advanced-chat':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getModeText = (mode: string) => {
    switch (mode) {
      case 'workflow':
        return '工作流'
      case 'chatbot':
        return '聊天机器人'
      case 'advanced-chat':
        return '高级聊天'
      default:
        return mode
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dify 工作流管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            管理您的 Dify AI 应用和工作流
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <AnimatedButton
            variant="outline"
            onClick={fetchDifyApps}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </AnimatedButton>
          <AnimatedButton
            className="bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={handleCreateApp}
          >
            <Plus className="mr-2 h-4 w-4" />
            在 Dify 中创建
          </AnimatedButton>
        </div>
      </div>

      {/* Dify 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: '总应用数', value: apps.length, icon: WorkflowIcon, color: 'from-blue-500 to-cyan-500' },
          { label: '工作流应用', value: apps.filter(a => a.mode === 'workflow').length, icon: WorkflowIcon, color: 'from-purple-500 to-pink-500' },
          { label: '聊天应用', value: apps.filter(a => a.mode === 'chatbot' || a.mode === 'advanced-chat').length, icon: WorkflowIcon, color: 'from-green-500 to-emerald-500' },
        ].map((stat, index) => (
          <MagicCard
            key={stat.label}
            delay={index * 0.1}
            className="p-6 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </MagicCard>
        ))}
      </div>

      {/* 应用列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <WorkflowIcon className="mr-2 h-5 w-5" />
            Dify 应用列表 ({apps.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : apps.length === 0 ? (
          <MagicCard className="p-12 text-center">
            <WorkflowIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">暂无 Dify 应用</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              在 Dify 中创建您的第一个 AI 工作流应用
            </p>
            <AnimatedButton onClick={handleCreateApp}>
              <Plus className="mr-2 h-4 w-4" />
              创建 Dify 应用
            </AnimatedButton>
          </MagicCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <MagicCard
                key={app.id}
                delay={index * 0.1}
                className="group p-6 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => handleOpenDify(app.id)}
              >
                {/* 卡片头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-xs px-3 py-1 rounded-full ${getModeBadge(app.mode)}`}>
                    {getModeText(app.mode)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDify(app.id)
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        在 Dify 中编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
                        window.open(`${difyUrl}/app/${app.id}/overview`, '_blank')
                      }}>
                        <Settings className="mr-2 h-4 w-4" />
                        应用配置
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* 卡片内容 */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {app.description || '暂无描述'}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <WorkflowIcon className="h-4 w-4" />
                      <span>ID: {app.id.slice(0, 8)}...</span>
                    </div>
                    <div>•</div>
                    <div>更新于 {new Date(app.updated_at).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* 卡片底部 */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    创建于 {new Date(app.created_at).toLocaleDateString()}
                  </span>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </MagicCard>
            ))}
          </div>
        )}
      </div>

      {/* Dify 链接提示 */}
      <MagicCard className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">直接访问 Dify</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              点击下方按钮打开 Dify 完整界面，在原生环境中管理所有工作流
            </p>
          </div>
          <AnimatedButton
            onClick={handleOpenDifyHome}
            variant="outline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            打开 Dify
          </AnimatedButton>
        </div>
      </MagicCard>
    </div>
  )
}
