'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
}

const DropdownMenu = ({ trigger, children, align = 'end' }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-56 rounded-lg',
            'bg-white dark:bg-gray-800',
            'border-2 border-gray-200 dark:border-gray-700',
            'shadow-xl',
            'animate-in fade-in slide-in-from-top-2 duration-200',
            alignClasses[align]
          )}
          role="menu"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'flex w-full items-center px-4 py-2.5 text-sm',
      'text-gray-700 dark:text-gray-200',
      'transition-colors duration-200',
      'hover:bg-blue-50 dark:hover:bg-gray-700',
      'hover:text-blue-600 dark:hover:text-blue-400',
      'focus:bg-blue-50 dark:focus:bg-gray-700',
      'focus:outline-none',
      className
    )}
    role="menuitem"
    {...props}
  >
    {children}
  </button>
))
DropdownItem.displayName = 'DropdownItem'

const DropdownSeparator = ({ className }: { className?: string }) => (
  <div className={cn('h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2', className)} />
)

export { DropdownMenu, DropdownItem, DropdownSeparator }
