import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '../lib/cn'

interface ProjectThumbProps {
  src: string
  alt: string
  /** Nome usado no placeholder caso a imagem não exista. */
  projectName: string
  segment?: string
  className?: string
  imgClassName?: string
  /** Prioridade de carregamento do navegador. */
  priority?: boolean
  sizes?: string
}

/**
 * Imagem de capa do projeto com placeholder elegante.
 * Se a captura ainda não existir, mostramos um cartão identificado com o
 * nome do projeto — nunca uma imagem genérica ou quebrada.
 */
export function ProjectThumb({
  src,
  alt,
  projectName,
  segment,
  className,
  imgClassName,
  priority = false,
  sizes,
}: ProjectThumbProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const initials = projectName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    return (
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center overflow-hidden bg-ink-900',
          className,
        )}
      >
        <div className="absolute inset-0 grain opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-accent-500/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <span className="font-display text-4xl font-extrabold text-white/90">{initials}</span>
          {segment && (
            <span className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
              {segment}
            </span>
          )}
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.7rem] text-white/60">
            <ImageOff className="h-3.5 w-3.5" />
            Preview em breve
          </span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover object-top', imgClassName)}
    />
  )
}
