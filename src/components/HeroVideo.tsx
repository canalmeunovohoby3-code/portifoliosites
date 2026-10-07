import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * Vídeo do hero.
 *
 * O navegador bloqueia áudio automático na primeira visita. Então:
 * - tenta iniciar JÁ COM SOM (funciona quando o navegador já liberou);
 * - se for bloqueado, toca mudo automaticamente e o som liga sozinho no
 *   primeiro toque/clique/tecla em qualquer lugar da página.
 * A pessoa pode desativar o som a qualquer momento (botão ou controles).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const activationEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'keydown',
      'click',
    ]

    const enableSound = () => {
      video.muted = false
      setMuted(false)
      video.play().catch(() => {})
      cleanup()
    }

    const cleanup = () => {
      activationEvents.forEach((event) =>
        window.removeEventListener(event, enableSound, true),
      )
    }

    // 1) Tenta reproduzir JÁ COM ÁUDIO.
    video.muted = false
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // 2) Bloqueado: toca mudo e liga o som no primeiro gesto do usuário.
        video.muted = true
        setMuted(true)
        video.play().catch(() => {})
        activationEvents.forEach((event) =>
          window.addEventListener(event, enableSound, { capture: true, once: true, passive: true }),
        )
      })
    }

    return cleanup
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setMuted(nextMuted)
    video.play().catch(() => {})
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* Brilho de fundo discreto */}
      <div
        className="pointer-events-none absolute -top-6 right-0 h-64 w-64 rounded-full bg-accent-200/55 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-ink-200/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-ink-900 shadow-frame">
        <video
          ref={videoRef}
          src="videohero-v4.mp4"
          autoPlay
          loop
          playsInline
          muted={muted}
          preload="metadata"
          controls
          controlsList="nodownload"
          className="aspect-video h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          className={cn(
            'absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold shadow-card transition-all duration-300 ease-smooth hover:-translate-y-0.5',
            muted ? 'bg-accent-500 text-white' : 'bg-white/90 text-ink-900 backdrop-blur',
          )}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? 'Ativar som' : 'Som ligado'}
        </button>
      </div>
    </div>
  )
}
