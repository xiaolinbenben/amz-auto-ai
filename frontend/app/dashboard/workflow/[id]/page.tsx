'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Settings,
  ChevronRight,
  GitBranch,
  Database,
  Cpu,
  FileText,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react'

interface Node {
  id: string
  type: 'start' | 'process' | 'condition' | 'output' | 'end'
  name: string
  position: { x: number; y: number }
  config?: Record<string, any>
}

interface Connection {
  from: string
  to: string
}

export default function WorkflowEditorPage() {
  const router = useRouter()
  const params = useParams()
  const workflowId = params.id as string

  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'start', name: '开始', position: { x: 100, y: 100 } },
    { id: '2', type: 'process', name: '数据输入', position: { x: 300, y: 100 } },
    { id: '3', type: 'process', name: 'AI 处理', position: { x: 500, y: 100 } },
    { id: '4', type: 'condition', name: '条件判断', position: { x: 700, y: 100 } },
    { id: '5', type: 'output', name: '输出结果', position: { x: 900, y: 100 } },
  ])

  const [connections, setConnections] = useState<Connection[]>([
    { from: '1', to: '2' },
    { from: '2', to: '3' },
    { from: '3', to: '4' },
    { from: '4', to: '5' },
  ])

  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const getNodeIcon = (type: Node['type']) => {
    switch (type) {
      case 'start':
        return <Play className="h-5 w-5" />
      case 'process':
        return <Cpu className="h-5 w-5" />
      case 'condition':
        return <GitBranch className="h-5 w-5" />
      case 'output':
        return <FileText className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getNodeColor = (type: Node['type']) => {
    switch (type) {
      case 'start':
        return 'from-green-500 to-emerald-500'
      case 'process':
        return 'from-blue-500 to-cyan-500'
      case 'condition':
        return 'from-orange-500 to-amber-500'
      case 'output':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const handleAddNode = () => {
    const newNode: Node = {
      id: `${Date.now()}`,
      type: 'process',
      name: '新节点',
      position: { x: 600, y: 300 },
    }
    setNodes([...nodes, newNode])
  }

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId))
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId))
  }

  const handleRunWorkflow = async () => {
    setIsRunning(true)
    // 模拟运行工作流
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsRunning(false)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 顶部工具栏 */}
      <MagicCard className="m-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/workflow')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回列表
            </AnimatedButton>
            <div>
              <h1 className="text-xl font-bold">Amazon 商品信息抓取</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">工作流 ID: {workflowId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <AnimatedButton variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              保存
            </AnimatedButton>
            <AnimatedButton size="sm" onClick={handleAddNode}>
              <Plus className="mr-2 h-4 w-4" />
              添加节点
            </AnimatedButton>
            <AnimatedButton
              size="sm"
              className="bg-gradient-to-r from-green-600 to-emerald-600"
              onClick={handleRunWorkflow}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  运行中...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  运行
                </>
              )}
            </AnimatedButton>
          </div>
        </div>
      </MagicCard>

      {/* 工作流画布 */}
      <div className="flex-1 relative overflow-hidden m-4">
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* 连接线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#94a3b8"
              />
            </marker>
          </defs>
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            return (
              <motion.path
                key={index}
                d={`M ${fromNode.position.x + 180} ${fromNode.position.y + 30}
                        C ${fromNode.position.x + 240} ${fromNode.position.y + 30},
                          ${toNode.position.x - 60} ${toNode.position.y + 30},
                          ${toNode.position.x} ${toNode.position.y + 30}`}
                stroke="#94a3b8"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )
          })}
        </svg>

        {/* 节点 */}
        <AnimatePresence>
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className={`absolute cursor-pointer transition-all ${
                selectedNode?.id === node.id ? 'z-20 scale-105' : 'z-10'
              }`}
              style={{
                left: node.position.x,
                top: node.position.y,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedNode(node)}
            >
              {/* 节点卡片 */}
              <MagicCard
                delay={0}
                className={`w-36 p-4 hover:shadow-xl transition-all border-2 ${
                  selectedNode?.id === node.id ? 'border-blue-500' : 'border-transparent'
                }`}
                hover={false}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getNodeColor(node.type)} flex items-center justify-center text-white mb-2`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <h3 className="font-semibold text-sm truncate">{node.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {node.type === 'start' ? '开始节点' :
                       node.type === 'process' ? '处理节点' :
                       node.type === 'condition' ? '条件节点' :
                       node.type === 'output' ? '输出节点' : '自定义'}
                    </p>
                  </div>
                  {node.type !== 'start' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNode(node.id)
                      }}
                      className="opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  )}
                </div>
              </MagicCard>

              {/* 连接点 */}
              {node.type !== 'end' && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
              )}
              {node.type !== 'start' && (
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 右侧配置面板 */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl p-6 overflow-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">节点配置</h2>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getNodeColor(selectedNode.type)} flex items-center justify-center text-white mx-auto`}>
                  {getNodeIcon(selectedNode.type)}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      节点名称
                    </label>
                    <input
                      type="text"
                      value={selectedNode.name}
                      onChange={(e) => {
                        const updated = nodes.map(n =>
                          n.id === selectedNode.id ? { ...n, name: e.target.value } : n
                        )
                        setNodes(updated)
                        setSelectedNode({ ...selectedNode, name: e.target.value })
                      }}
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      节点类型
                    </label>
                    <select
                      value={selectedNode.type}
                      onChange={(e) => {
                        const updated = nodes.map(n =>
                          n.id === selectedNode.id ? { ...n, type: e.target.value as Node['type'] } : n
                        )
                        setNodes(updated)
                        setSelectedNode({ ...selectedNode, type: e.target.value as Node['type'] })
                      }}
                      className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="process">处理节点</option>
                      <option value="condition">条件节点</option>
                      <option value="output">输出节点</option>
                    </select>
                  </div>

                  {selectedNode.type === 'process' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        AI 模型
                      </label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600">
                        <option>GPT-4</option>
                        <option>GPT-3.5 Turbo</option>
                        <option>Claude 3</option>
                        <option>自定义模型</option>
                      </select>
                    </div>
                  )}

                  {selectedNode.type === 'condition' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        条件表达式
                      </label>
                      <input
                        type="text"
                        placeholder="例如: score > 0.8"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  )}

                  <AnimatedButton className="w-full" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    高级配置
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
