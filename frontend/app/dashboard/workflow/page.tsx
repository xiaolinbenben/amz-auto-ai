'use client'

import { useState, useEffect } from 'react'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { motion } from 'framer-motion'
import { Play, Plus, Settings, ChevronRight, Workflow as WorkflowIcon } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  lastRun: string
}

export default function WorkflowPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Amazon 商品信息抓取',
      description: '从 Amazon 抓取商品信息并生成优化建议',
      status: 'active',
      lastRun: '10 分钟前',
    },
    {
      id: '2',
      name: 'Listing 优化生成',
      description: '基于抓取数据生成优化的标题和 Bullet Points',
      status: 'active',
      lastRun: '1 小时前',
    },
  ])

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0])

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            工作流编排
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            管理和运行您的 AI 工作流
          </p>
        </div>
        <AnimatedButton className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-4 w-4" />
          新建工作流
        </AnimatedButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：工作流列表 */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <WorkflowIcon className="mr-2 h-5 w-5" />
            工作流列表
          </h2>
          {workflows.map((workflow, index) => (
            <MagicCard
              key={workflow.id}
              delay={index * 0.1}
              className={`p-4 cursor-pointer transition-all ${
                selectedWorkflow?.id === workflow.id
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{workflow.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {workflow.description}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        workflow.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}
                    >
                      {workflow.status === 'active' ? '运行中' : '已停止'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {workflow.lastRun}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </MagicCard>
          ))}
        </div>

        {/* 右侧：Dify 工作流编辑器 */}
        <div className="lg:col-span-2">
          <MagicCard className="h-full min-h-[600px]">
            <div className="border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedWorkflow?.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedWorkflow?.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <AnimatedButton size="sm" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  配置
                </AnimatedButton>
                <AnimatedButton size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <Play className="mr-2 h-4 w-4" />
                  运行
                </AnimatedButton>
              </div>
            </div>

            {/* Dify 工作流编辑器嵌入 */}
            <div className="p-4 h-[500px] bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <WorkflowIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Dify 工作流编辑器</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    在此处编排和配置您的 AI 工作流
                  </p>
                </div>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>• 拖拽节点创建工作流</p>
                  <p>• 连接节点定义数据流</p>
                  <p>• 配置参数和触发条件</p>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  )
}
