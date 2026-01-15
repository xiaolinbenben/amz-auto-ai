'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { motion } from 'framer-motion'
import { Plus, Play, Pause, Settings, Trash2, ChevronRight, Edit, Workflow as WorkflowIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'running'
  lastRun: string
  createdAt: string
  nodeCount: number
}

export default function WorkflowListPage() {
  const router = useRouter()
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Amazon 商品信息抓取',
      description: '从 Amazon 抓取商品信息并生成优化建议',
      status: 'active',
      lastRun: '10 分钟前',
      createdAt: '2026-01-15',
      nodeCount: 5,
    },
    {
      id: '2',
      name: 'Listing 优化生成',
      description: '基于抓取数据生成优化的标题和 Bullet Points',
      status: 'inactive',
      lastRun: '1 小时前',
      createdAt: '2026-01-14',
      nodeCount: 8,
    },
    {
      id: '3',
      name: '关键词分析工作流',
      description: '分析商品关键词并生成优化建议',
      status: 'running',
      lastRun: '30 分钟前',
      createdAt: '2026-01-13',
      nodeCount: 6,
    },
  ])

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'running':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getStatusText = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return '活跃'
      case 'running':
        return '运行中'
      case 'inactive':
        return '已停止'
      default:
        return '未知'
    }
  }

  const handleEditWorkflow = (id: string) => {
    router.push(`/dashboard/workflow/${id}`)
  }

  const handleCreateWorkflow = () => {
    // 创建新工作流后跳转到编辑器
    const newId = `${Date.now()}`
    router.push(`/dashboard/workflow/${newId}`)
  }

  const handleDeleteWorkflow = (id: string) => {
    if (confirm('确定要删除这个工作流吗？')) {
      setWorkflows(workflows.filter(w => w.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setWorkflows(workflows.map(w =>
      w.id === id
        ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
        : w
    ))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            工作流管理
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            管理和配置您的 AI 工作流
          </p>
        </div>
        <AnimatedButton
          className="bg-gradient-to-r from-blue-600 to-purple-600"
          onClick={handleCreateWorkflow}
        >
          <Plus className="mr-2 h-4 w-4" />
          新建工作流
        </AnimatedButton>
      </div>

      {/* 工作流统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '总工作流', value: workflows.length, icon: WorkflowIcon, color: 'from-blue-500 to-cyan-500' },
          { label: '运行中', value: workflows.filter(w => w.status === 'running').length, icon: Play, color: 'from-green-500 to-emerald-500' },
          { label: '活跃', value: workflows.filter(w => w.status === 'active').length, icon: WorkflowIcon, color: 'from-purple-500 to-pink-500' },
          { label: '已停止', value: workflows.filter(w => w.status === 'inactive').length, icon: Pause, color: 'from-gray-500 to-slate-500' },
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

      {/* 工作流列表 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center">
          <WorkflowIcon className="mr-2 h-5 w-5" />
          工作流列表 ({workflows.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => (
            <MagicCard
              key={workflow.id}
              delay={index * 0.1}
              className="group p-6 hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => handleEditWorkflow(workflow.id)}
            >
              {/* 卡片头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className={`text-xs px-3 py-1 rounded-full ${getStatusColor(workflow.status)}`}>
                  {getStatusText(workflow.status)}
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
                      handleEditWorkflow(workflow.id)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation()
                      handleToggleStatus(workflow.id)
                    }}>
                      {workflow.status === 'active' ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          停止
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          启动
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteWorkflow(workflow.id)
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* 卡片内容 */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {workflow.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {workflow.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <WorkflowIcon className="h-4 w-4" />
                    <span>{workflow.nodeCount} 个节点</span>
                  </div>
                  <div>•</div>
                  <div>最后运行: {workflow.lastRun}</div>
                </div>
              </div>

              {/* 卡片底部 */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  创建于 {workflow.createdAt}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </MagicCard>
          ))}
        </div>

        {/* 空状态 */}
        {workflows.length === 0 && (
          <MagicCard className="p-12 text-center">
            <WorkflowIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">暂无工作流</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              创建您的第一个 AI 工作流开始使用
            </p>
            <AnimatedButton onClick={handleCreateWorkflow}>
              <Plus className="mr-2 h-4 w-4" />
              创建工作流
            </AnimatedButton>
          </MagicCard>
        )}
      </div>
    </div>
  )
}
