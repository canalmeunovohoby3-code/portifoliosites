import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * Vídeo do hero.
 *
 * O navegador bloqueia áudio automático na primeira visita. Então:
 * - tenta iniciar JÁ COM SOM (funciona para quem o navegador já liberou);
 * - se for bloqueado, o vídeo toca mudo e mostramos uma tela de entrada:
 *   "Entrar com som" (um toque) faz o vídeo começar COM ÁUDIO; "Entrar sem som"
 *   mantém mudo. A pessoa pode desativar o som a qualquer momento.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const entryRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const [showEntry, setShowEntry] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Bloqueado sem interação: toca mudo e mostra a tela de entrada.
        video.muted = true
        setMuted(true)
        video.play().catch(() => {})
        setShowEntry(true)
      })
    }
  }, [])

  // Enquanto a tela de entrada está visível, o primeiro toque/clique/tecla em
  // QUALQUER lugar da página já liga o som e começa o vídeo com áudio.
  useEffect(() => {
    if (!showEntry) return
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click']

    const handler = (event: Event) => {
      const target = event.target
      if (entryRef.current && target instanceof Node && entryRef.current.contains(target)) return
      const video = videoRef.current
      if (!video) return
      video.currentTime = 0
      video.muted = false
      setMuted(false)
      setShowEntry(false)
      video.play().catch(() => {})
    }

    events.forEach((name) => window.addEventListener(name, handler, true))
    return () => events.forEach((name) => window.removeEventListener(name, handler, true))
  }, [showEntry])

  const enterWithSound = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.muted = false
    setMuted(false)
    setShowEntry(false)
    video.play().catch(() => {})
  }

  const enterMuted = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    setMuted(true)
    setShowEntry(false)
    video.play().catch(() => {})
  }

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
          src="videohero.mp4"
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

        {/* Tela de entrada (somente quando o navegador bloqueia o áudio) */}
        {showEntry && (
          <div
            ref={entryRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink-900/72 px-6 text-center backdrop-blur-sm"
          >
            <p className="font-display text-[1.05rem] font-bold text-white">Veja com som</p>
            <p className="max-w-xs text-[0.82rem] leading-relaxed text-white/70">
              Este vídeo mostra o processo de criação dos sites. Entre com o som para ver a experiência completa.
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={enterWithSound}
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2.5 text-[0.82rem] font-semibold text-white shadow-accent transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-600"
              >
                <Volume2 className="h-4 w-4" />
                Entrar com som
              </button>
              <button
                type="button"
                onClick={enterMuted}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-300 ease-smooth hover:border-white hover:bg-white/10"
              >
                Entrar sem som
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
