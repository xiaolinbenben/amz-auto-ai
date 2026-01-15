'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MagicCard } from '@/components/magic/MagicCard'
import { AnimatedButton } from '@/components/magic/AnimatedButton'
import { Loader2, ExternalLink, Sparkles, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function WorkflowEditorPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.id as string

  useEffect(() => {
    const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
    const workflowUrl = `${difyUrl}/app/${appId}/workflow`
    window.open(workflowUrl, '_blank')
    setTimeout(() => router.push('/dashboard/workflow'), 1500)
  }, [appId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg"
      >
        <MagicCard className="p-8 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-0 shadow-2xl">
          <div className="flex flex-col items-center space-y-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-30" />
              <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="h-12 w-12 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
                  </motion.div>
                  <motion.div
                    className="absolute"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                正在打开 Dify 工作流编辑器
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                即将跳转到 Dify 原生界面
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 border border-blue-200 dark:border-blue-800">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x" />
                <div className="relative">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">工作流 ID</p>
                  <div className="flex items-center space-x-3">
                    <p className="font-mono text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                      {appId}
                    </p>
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full grid grid-cols-2 gap-4"
            >
              <MagicCard hover className="p-4 text-center group cursor-pointer" delay={0}>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">在新标签页打开</p>
                </div>
              </MagicCard>
              <MagicCard hover className="p-4 text-center group cursor-pointer" delay={0.1}>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">原生编辑器</p>
                </div>
              </MagicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full space-y-3"
            >
              <AnimatedButton
                className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                onClick={() => {
                  const difyUrl = process.env.NEXT_PUBLIC_DIFY_URL || 'http://localhost:3000'
                  window.open(`${difyUrl}/app/${appId}/workflow`, '_blank')
                }}
              >
                <ExternalLink className="mr-3 h-5 w-5" />
                在 Dify 中打开工作流
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>

              <AnimatedButton
                variant="outline"
                className="w-full h-12 border-2 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                onClick={() => router.push('/dashboard/workflow')}
              >
                返回工作流列表
              </AnimatedButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center space-y-1"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-purple-600">Dify 工作流编辑器</span> 将在新标签页中打开
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                使用 Dify 原生界面，享受可视化节点编排体验
              </p>
            </motion.div>
          </div>
        </MagicCard>
      </motion.div>
    </div>
  )
}
