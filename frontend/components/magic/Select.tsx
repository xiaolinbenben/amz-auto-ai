'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  placeholder?: string
  disabled?: boolean
  className?: string
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {}
})

const Select = ({ value, onValueChange, children, placeholder = '请选择...', disabled = false, className }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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

  const displayValue = React.useMemo(() => {
    let display = placeholder
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectItem && child.props.value === value) {
        display = child.props.children as string
      }
    })
    return display
  }, [value, children, placeholder])

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border-2 border-gray-200',
            'bg-white dark:bg-gray-800 px-3 py-2 text-sm',
            'transition-all duration-300',
            'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none',
            'hover:border-gray-300',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400/10',
            className
          )}
        >
          <span className={cn(!value && 'text-gray-400 dark:text-gray-500')}>
            {displayValue}
          </span>
          <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 mt-1 w-full rounded-lg',
              'bg-white dark:bg-gray-800',
              'border-2 border-gray-200 dark:border-gray-700',
              'shadow-xl max-h-60 overflow-auto',
              'animate-in fade-in slide-in-from-top-2 duration-200'
            )}
          >
            <div className="py-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === SelectItem) {
                  return React.cloneElement(child as React.ReactElement<any>, {
                    selected: child.props.value === value
                  })
                }
                return child
              })}
            </div>
          </div>
        )}
      </div>
    </SelectContext.Provider>
  )
}

const SelectItem = ({ value, children, selected = false }: SelectItemProps & { selected?: boolean }) => {
  const { onValueChange, setIsOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      onClick={() => {
        onValueChange?.(value)
        setIsOpen(false)
      }}
      className={cn(
        'flex w-full items-center px-4 py-2.5 text-sm',
        'transition-colors duration-200',
        selected
          ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
        'focus:bg-blue-50 dark:focus:bg-gray-700 focus:outline-none'
      )}
    >
      {children}
    </button>
  )
}

const SelectLabel = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider', className)}>
    {children}
  </div>
)

export { Select, SelectItem, SelectLabel }
