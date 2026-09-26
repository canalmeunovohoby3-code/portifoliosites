import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'dark' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface CTAButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  ariaLabel?: string
  external?: boolean
  type?: 'button' | 'submit'
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-accent hover:shadow-[0_22px_46px_-18px_rgba(224,74,103,0.75)]',
  dark: 'bg-ink-900 text-white hover:bg-ink-700',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:border-ink-900 hover:bg-ink-50',
  ghost: 'bg-transparent text-ink-900 hover:bg-ink-100/70',
  outline:
    'bg-transparent text-white border border-white/35 hover:border-white hover:bg-white/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-[0.82rem] px-4 py-2.5 gap-1.5',
  md: 'text-[0.9rem] px-5 py-3 gap-2',
  lg: 'text-[0.95rem] px-7 py-3.5 gap-2.5',
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className,
  ariaLabel,
  external = false,
  type = 'button',
}: CTAButtonProps) {
  const classes = cn(
    'group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold tracking-tight',
    'transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  const content = (
    <>
      {(variant === 'primary' || variant === 'dark') && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-smooth group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
      {Icon && iconPosition === 'left' && (
        <Icon className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span className="relative">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {content}
    </button>
  )
}
