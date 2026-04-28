'use client'

import Link from 'next/link'

const MIN_DURATION_MS = 750
const MAX_DURATION_MS = 1150
const DURATION_PER_PX = 0.6
const WORK_PLAY_EXTRA_SCROLL_PX = 72
const DESKTOP_BREAKPOINT_PX = 1025

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

const getExtraSectionOffset = (hash: string) => {
  if (
    (hash === 'work' || hash === 'play') &&
    window.innerWidth < DESKTOP_BREAKPOINT_PX
  ) {
    return WORK_PLAY_EXTRA_SCROLL_PX
  }
  return 0
}

const getTargetTop = (element: HTMLElement, hash: string) => {
  const style = window.getComputedStyle(element)
  const scrollMarginTop = Number.parseFloat(style.scrollMarginTop) || 0
  return (
    element.getBoundingClientRect().top +
    window.scrollY -
    scrollMarginTop +
    getExtraSectionOffset(hash)
  )
}

const getDuration = (distance: number) => {
  const proposed = Math.abs(distance) * DURATION_PER_PX
  return Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, proposed))
}

const smoothScrollToElement = (element: HTMLElement, hash: string) => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const startY = window.scrollY
  const targetY = getTargetTop(element, hash)
  const distance = targetY - startY

  if (prefersReducedMotion || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: 'auto' })
    return
  }

  const duration = getDuration(distance)
  const startTime = performance.now()

  const step = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutExpo(progress)
    const currentY = Math.round(startY + distance * easedProgress)

    window.scrollTo({ top: currentY, behavior: 'auto' })

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export default function Navbar() {
  const navLinks = [
    { href: '/#about', label: 'ABOUT' },
    { href: '/#work', label: 'WORK' },
    { href: '/#play', label: 'PLAY' }
  ]

  return (
    <div className='tablet:pt-0 fixed inset-x-0 top-0 z-50 flex w-full justify-center pt-3'>
      <nav className='font-tertiary tablet:w-full tablet:justify-between tablet:rounded-none tablet:border-0 tablet:border-b tablet:border-white/5 tablet:bg-neutral-950/60 tablet:px-8 tablet:py-4 tablet:text-base flex flex-row items-center justify-center gap-8 rounded-full border border-white/10 bg-neutral-900/80 px-8 py-3.5 text-base font-medium backdrop-blur-xl'>
        <div className='tablet:flex hidden flex-row items-center gap-4'>
          <div>JAGAT SACHDEVA</div>
          <div className='hidden text-[#A1A1A1] min-[420px]:block'>
            PRODUCT ENGINEER
          </div>
        </div>
        <div className='flex flex-row items-center gap-8'>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={event => {
                const hash = link.href.split('#')[1]
                if (!hash) {
                  return
                }

                const target = document.getElementById(hash)
                if (!target) {
                  return
                }

                event.preventDefault()
                smoothScrollToElement(target, hash)
                window.history.replaceState(null, '', `/#${hash}`)
              }}
              className='font-light tracking-wide text-[#A1A1A1] uppercase transition-colors hover:text-[#D0D0D0]'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
