import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ImageOff,
  Loader2,
  Maximize2,
  MessageCircle,
  Minimize2,
  X,
} from 'lucide-react'
import type { Project } from '../types'
import { previewSection } from '../data/content'
import { useScrollLock } from '../hooks/useScrollLock'
import { track } from '../lib/analytics'
import { cn } from '../lib/cn'
import { openWhatsApp, projectWhatsappUrl } from '../lib/whatsapp'
import { CTAButton } from './ui/CTAButton'

interface ProjectPreviewProps {
  project: Project | null
  onClose: () => void
}

/**
 * Preview embutido — o visitante navega pelo site real sem sair do portfólio.
 *
 * - iframe carregado SOMENTE quando o preview é aberto (lazy de verdade);
 * - fallback de demonstração visual quando o projeto não permite iframe;
 * - moldura de navegador, tela cheia, ESC, CTA contextual de WhatsApp;
 * - ao fechar, a posição anterior do portfólio é restaurada.
 */
export function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openedAtRef = useRef<number>(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const isOpen = Boolean(project)
  useScrollLock(isOpen)

  // Reset de estado a cada abertura + métricas de visualização.
  useEffect(() => {
    if (!project) return
    openedAtRef.current = Date.now()
    setIframeLoaded(false)
    setIsFullscreen(false)

    track('preview_open', {
      projectId: project.id,
      projectName: project.name,
      category: project.category,
    })

    // Foco no botão fechar (acessibilidade).
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 60)

    return () => {
      window.clearTimeout(timer)
      track('preview_close', {
        projectId: project.id,
        projectName: project.name,
        durationMs: Date.now() - openedAtRef.current,
      })
    }
  }, [project])

  // ESC fecha.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Sincroniza o estado de tela cheia com o navegador.
  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    const node = frameRef.current
    if (!node) return

    if (!document.fullscreenElement) {
      node.requestFullscreen?.().then(() => {
        track('preview_fullscreen', { projectId: project?.id })
      })
    } else {
      document.exitFullscreen?.()
    }
  }, [project])

  const handleCta = useCallback(() => {
    if (!project) return
    track('preview_cta_click', { projectId: project.id, projectName: project.name })
    track('whatsapp_click', { source: 'preview', projectId: project.id })
    openWhatsApp(projectWhatsappUrl(project))
  }, [project])

  if (!project) return null

  const label = project.url ?? project.name
  const useIframe = project.iframeEnabled

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview do projeto ${project.name}`}
    >
      {/* Fundo escurecido */}
      <button
        type="button"
        aria-label="Fechar preview"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in cursor-default bg-ink-900/60 backdrop-blur-sm"
      />

      {/* Cartão do preview (fullscreen no mobile) */}
      <div
        ref={frameRef}
        className="relative flex h-full w-full animate-preview-in flex-col overflow-hidden bg-ink-900 shadow-frame sm:h-[90vh] sm:max-h-[860px] sm:rounded-2xl lg:h-[88vh] lg:max-w-[1280px]"
      >
        {/* Barra do navegador */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-ink-800 px-3 py-2.5 sm:px-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar ao portfólio</span>
          </button>

          <div className="browser-dots hidden shrink-0 sm:flex" aria-hidden="true">
            <span className="browser-dot bg-white/20" />
            <span className="browser-dot bg-white/20" />
            <span className="browser-dot bg-white/20" />
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-ink-900 px-3 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
            <span className="truncate text-xs font-medium text-white/55">{label}</span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar preview"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-accent-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Área do projeto */}
        <div className="relative min-h-0 flex-1 bg-paper-muted">
          {useIframe ? (
            <>
              {!iframeLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-paper-muted text-ink-400">
                  <Loader2 className="h-6 w-6 animate-spin text-accent-500" />
                  <p className="text-sm">Carregando {project.name}…</p>
                </div>
              )}
              <iframe
                src={project.previewUrl}
                title={`Site ${project.name}`}
                onLoad={() => setIframeLoaded(true)}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                className={cn(
                  'h-full w-full border-0 bg-white transition-opacity duration-500',
                  iframeLoaded ? 'opacity-100' : 'opacity-0',
                )}
              />
            </>
          ) : (
            <div className="preview-scroll h-full overflow-y-auto bg-paper-fog">
              <div className="sticky top-0 z-10 flex items-center justify-center gap-2 border-b border-ink-100 bg-white/90 px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-400 backdrop-blur">
                <ImageOff className="h-3.5 w-3.5" />
                {previewSection.demoNote}
              </div>
              {project.longPreviewImage ? (
                <img
                  src={project.longPreviewImage}
                  alt={`Demonstração visual do projeto ${project.name}`}
                  className="mx-auto block w-full max-w-[1100px]"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="mx-auto flex max-w-[1100px] items-center justify-center p-6">
                  <img
                    src={project.coverImage}
                    alt={`Prévia do projeto ${project.name}`}
                    className="w-full rounded-xl border border-ink-100 bg-white shadow-card"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA de conversão dentro do preview */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-ink-900 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <p className="text-[0.9rem] font-semibold text-white">{previewSection.ctaTitle}</p>
            <p className="truncate text-[0.8rem] text-white/55">{previewSection.ctaText}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden max-w-[200px] flex-col text-right sm:flex">
              <span className="truncate text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/35">
                Projeto
              </span>
              <span className="truncate text-[0.78rem] text-white/60">{project.segment}</span>
            </div>
            <CTAButton
              variant="primary"
              size="md"
              icon={MessageCircle}
              iconPosition="left"
              onClick={handleCta}
              className="flex-1 sm:flex-none"
            >
              {previewSection.ctaButton}
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}
