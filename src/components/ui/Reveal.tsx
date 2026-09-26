import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Atraso escalonado em segundos (ex.: index * 0.06). */
  delay?: number
}

/** Wrapper do reveal no scroll (a animação vem da classe `.reveal` no CSS). */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  return (
    <Tag
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}
