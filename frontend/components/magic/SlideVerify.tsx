'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SlideVerifyProps {
  onVerify: (success: boolean) => void
}

export default function SlideVerify({ onVerify }: SlideVerifyProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(0)
  const [verified, setVerified] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => {
    setIsDragging(false)
    if (position >= 250) {
      setVerified(true)
      onVerify(true)
      setPosition(250)
    } else {
      setPosition(0)
      onVerify(false)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const newPos = e.clientX - rect.left - 20
    setPosition(Math.max(0, Math.min(newPos, 250)))
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, position])

  return (
    <div className="w-full space-y-2">
      <div
        ref={sliderRef}
        className="relative h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden select-none"
      >
        <motion.div
          className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full cursor-grab active:cursor-grabbing"
          style={{ left: `${position}px` }}
          ref={handleRef}
          onMouseDown={handleMouseDown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full h-full flex items-center justify-center text-white">
            {verified ? '✓' : '→'}
          </div>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 pointer-events-none">
          {verified ? '验证成功' : '向右滑动完成验证'}
        </div>
      </div>
    </div>
  )
}
