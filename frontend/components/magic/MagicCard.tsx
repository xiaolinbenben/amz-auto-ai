'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  delay?: number
  gradient?: boolean
}

export const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
  ({ children, hover = true, delay = 0, gradient = false, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000)
      return () => clearTimeout(timer)
    }, [delay])

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          'bg-white dark:bg-gray-800',
          gradient
            ? 'bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900'
            : '',
          'border-2 border-gray-200 dark:border-gray-700',
          'shadow-lg',
          'transition-all duration-500 ease-out',
          hover && 'hover:shadow-2xl hover:scale-[1.02] hover:border-blue-200 dark:hover:border-blue-800',
          !isVisible && 'opacity-0 translate-y-8',
          isVisible && 'opacity-100 translate-y-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

MagicCard.displayName = 'MagicCard'
