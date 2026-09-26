import { Fragment, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface TypedHeadlineProps {
  text: string
  className?: string
  /** Atraso antes da primeira letra (ms). */
  startDelay?: number
  /** Intervalo entre letras (ms). */
  charDelay?: number
  /** Pausa com o título completo, para leitura (ms). */
  settleDelay?: number
  /** Duração do fade de saída antes de reescrever (ms). */
  exitMs?: number
}

interface WordNode {
  letters: string[]
  wordStart: number
  isLast: boolean
}

/** Divide o texto em palavras, preservando o índice global de cada caractere. */
function buildWords(text: string): WordNode[] {
  const words = text.split(' ')
  let cursor = 0

  return words.map((word, index) => {
    const letters = Array.from(word)
    const wordStart = cursor
    cursor += letters.length + 1 // +1 = espaço
    return { letters, wordStart, isLast: index === words.length - 1 }
  })
}

/**
 * Soletração premium do título — em ciclo contínuo.
 *
 * Escreve caractere por caractere, mantém o título completo para leitura,
 * desaparece suavemente e reescreve. Nunca para.
 *
 * - a letra que está entrando recebe #E04A67 e volta suave à cor normal;
 * - o espaço do texto completo é reservado desde o início (sem deslocar layout);
 * - cada palavra fica em um bloco próprio (a quebra só acontece entre palavras).
 */
export function TypedHeadline({
  text,
  className,
  startDelay = 300,
  charDelay = 55,
  settleDelay = 2000,
  exitMs = 380,
}: TypedHeadlineProps) {
  const words = buildWords(text)
  const totalChars = Array.from(text).length
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(-1)
  const [exiting, setExiting] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const clearAll = () => {
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
    }
    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms))
    }

    clearAll()
    let index = 0

    const typeNext = () => {
      index += 1
      setCount(index)
      setActive(index - 1)

      if (index < totalChars) {
        schedule(typeNext, charDelay)
      } else {
        // Terminou: mantém para leitura, desaparece e recomeça.
        schedule(() => {
          setActive(-1)
          setExiting(true)
          schedule(restart, exitMs)
        }, settleDelay)
      }
    }

    const restart = () => {
      index = 0
      setExiting(false)
      setCount(0)
      setActive(-1)
      schedule(typeNext, startDelay)
    }

    schedule(typeNext, startDelay)
    return clearAll
  }, [text, charDelay, startDelay, settleDelay, exitMs, totalChars])

  return (
    <h1
      className={cn('whitespace-pre-wrap', className)}
      aria-label={text}
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-6px)' : 'none',
        transition: 'opacity 380ms ease, transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <span aria-hidden="true">
        {words.map((word) => (
          <Fragment key={word.wordStart}>
            <span className="inline-block whitespace-nowrap">
              {word.letters.map((char, i) => {
                const globalIndex = word.wordStart + i
                const revealed = globalIndex < count
                const isActive = globalIndex === active

                return (
                  <span
                    key={globalIndex}
                    className={cn('inline-block', isActive && 'text-accent-500')}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(0.24em)',
                      // A letra ativa acende na hora (#E04A67); as anteriores
                      // voltam suavemente para a cor normal.
                      transition: isActive
                        ? 'color 0ms, opacity 300ms ease-out, transform 340ms cubic-bezier(0.22, 1, 0.36, 1)'
                        : 'color 320ms ease-out, opacity 300ms ease-out, transform 340ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
            {!word.isLast && ' '}
          </Fragment>
        ))}
      </span>
    </h1>
  )
}
