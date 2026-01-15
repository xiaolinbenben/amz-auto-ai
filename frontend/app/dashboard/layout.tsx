'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TopNav from '@/components/TopNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNav />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
