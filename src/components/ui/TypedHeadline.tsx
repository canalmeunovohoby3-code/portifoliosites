import { Fragment, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface TypedHeadlineProps {
  text: string
  className?: string
  /** Atraso antes da primeira letra (ms). */
  startDelay?: number
  /** Intervalo entre letras (ms). */
  charDelay?: number
  /** Tempo em que a última letra permanece destacada antes de voltar à cor normal (ms). */
  settleDelay?: number
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
 * Soletração premium do título.
 *
 * - cada caractere entra individualmente (opacidade + leve subida);
 * - a letra que está entrando recebe a cor de destaque (#E04A67) e, quando a
 *   próxima aparece, ela volta suavemente para a cor normal;
 * - o espaço do texto completo é reservado desde o início — o layout não se
 *   desloca em nenhum momento;
 * - cada palavra fica em um bloco próprio, então a quebra de linha acontece
 *   só entre palavras (nunca no meio de uma).
 */
export function TypedHeadline({
  text,
  className,
  startDelay = 300,
  charDelay = 55,
  settleDelay = 900,
}: TypedHeadlineProps) {
  const words = buildWords(text)
  const totalChars = Array.from(text).length
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(-1)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(timerRef.current)
    setCount(0)
    setActive(-1)

    let index = 0
    const tick = () => {
      index += 1
      setCount(index)
      setActive(index - 1)

      if (index < totalChars) {
        timerRef.current = window.setTimeout(tick, charDelay)
      } else {
        timerRef.current = window.setTimeout(() => setActive(-1), settleDelay)
      }
    }

    timerRef.current = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timerRef.current)
  }, [text, charDelay, startDelay, settleDelay, totalChars])

  return (
    <h1 className={cn('whitespace-pre-wrap', className)} aria-label={text}>
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
                      transition:
                        'opacity 300ms ease-out, transform 340ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease-out',
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
