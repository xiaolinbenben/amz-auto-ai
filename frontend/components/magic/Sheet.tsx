'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
}

const SheetContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {}
})

const Sheet = ({ open = false, onOpenChange, children, side = 'right' }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, onClick, children, asChild, ...props }, ref) => {
    const { onOpenChange } = React.useContext(SheetContext)
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      onOpenChange(true)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
           // Call the child's original onClick if it exists
           if (children.props.onClick) {
             children.props.onClick(e)
           }
           handleClick(e)
        },
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={cn('inline-flex', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetTrigger.displayName = 'SheetTrigger'

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: 'left' | 'right' | 'top' | 'bottom' }
>(({ className, children, side = 'right', ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(SheetContext)

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  if (!open) return null

  const sideClasses = {
    left: 'left-0 top-0 h-full w-80 border-r',
    right: 'right-0 top-0 h-full w-80 border-l',
    top: 'top-0 left-0 w-full h-80 border-b',
    bottom: 'bottom-0 left-0 w-full h-80 border-t'
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={ref}
        className={cn(
          'fixed z-50 bg-white dark:bg-gray-800 shadow-2xl p-6',
          sideClasses[side],
          'animate-in slide-in-from-right duration-300',
          className
        )}
        {...props}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 rounded-lg p-1 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
})
SheetContent.displayName = 'SheetContent'

export { Sheet, SheetTrigger, SheetContent }
