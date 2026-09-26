import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface BrowserFrameProps {
  /** Rótulo exibido na barra (domínio ou nome do projeto). */
  label?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  /** Barra escura, usada sobre fundos escuros. */
  tone?: 'light' | 'dark'
}

/**
 * Moldura visual de navegador reutilizada no hero e no preview.
 * Mantém a leitura de "isso é um site de verdade" em qualquer contexto.
 */
export function BrowserFrame({
  label,
  children,
  className,
  bodyClassName,
  tone = 'light',
}: BrowserFrameProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border shadow-frame',
        isDark ? 'border-white/10 bg-ink-900' : 'border-ink-100 bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 border-b px-4 py-3',
          isDark ? 'border-white/10 bg-ink-800' : 'border-ink-100 bg-paper-muted/90',
        )}
      >
        <div className="browser-dots" aria-hidden="true">
          <span className={cn('browser-dot', isDark ? 'bg-white/25' : 'bg-ink-200')} />
          <span className={cn('browser-dot', isDark ? 'bg-white/25' : 'bg-ink-200')} />
          <span className={cn('browser-dot', isDark ? 'bg-white/25' : 'bg-ink-200')} />
        </div>
        <div
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2 rounded-full border px-3 py-1.5',
            isDark ? 'border-white/10 bg-ink-900' : 'border-ink-100 bg-white',
          )}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
          <span
            className={cn(
              'truncate text-xs font-medium',
              isDark ? 'text-white/45' : 'text-ink-400',
            )}
          >
            {label ?? 'seu-projeto.com.br'}
          </span>
        </div>
      </div>
      <div className={cn('relative', bodyClassName)}>{children}</div>
    </div>
  )
}
