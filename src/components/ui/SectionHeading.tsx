import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  text?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  titleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  tone = 'light',
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'reveal flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', tone === 'dark' && 'text-accent-300')}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          'mt-4 font-display text-display-sm font-bold md:text-[2.6rem]',
          tone === 'dark' && 'text-white',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            'mt-4 max-w-prose text-[1.02rem] leading-relaxed',
            tone === 'dark' ? 'text-white/70' : 'text-ink-500',
            align === 'center' && 'mx-auto',
          )}
        >
          {text}
        </p>
      )}
    </div>
  )
}
