'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'default' | 'gradient' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  ripple?: boolean
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ loading = false, variant = 'default', size = 'md', ripple = true, children, disabled, className, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple) return
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const id = Date.now()
      setRipples((prev) => [...prev, { id, x, y }])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    }

    const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-lg overflow-hidden transition-all duration-300'
    
    const variants = {
      default: 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 active:scale-95 shadow-lg shadow-blue-500/25',
      outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 active:scale-95 bg-transparent',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:scale-95'
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base'
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        onMouseDown={createRipple}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)',
              animation: 'ripple 0.6s linear'
            }}
          />
        ))}
        <style jsx>{`
          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }
        `}</style>
      </button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'
