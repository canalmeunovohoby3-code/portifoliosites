import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * Vídeo do hero.
 *
 * Autoplay: o navegador só permite reprodução automática COM som depois de uma
 * interação do usuário. Então o componente tenta iniciar com som; se for
 * bloqueado, começa mudo (para tocar automaticamente) e mostra o botão
 * "Ativar som". Assim ele nunca fica parado.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Bloqueado sem interação: reproduz mudo automaticamente.
        video.muted = true
        setMuted(true)
        video.play().catch(() => {})
      })
    }
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
    <div className="relative mx-auto w-full max-w-[560px]">
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
          src="videohero.mp4"
          autoPlay
          loop
          playsInline
          muted={muted}
          preload="metadata"
          className="aspect-video h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          className={cn(
            'absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold shadow-card transition-all duration-300 ease-smooth hover:-translate-y-0.5',
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
