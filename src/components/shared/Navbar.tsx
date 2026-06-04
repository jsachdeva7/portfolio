'use client'

import Link from 'next/link'

const MIN_DURATION_MS = 750
const MAX_DURATION_MS = 1150
const DURATION_PER_PX = 0.6
const WORK_PLAY_EXTRA_SCROLL_PX = 72
const DESKTOP_BREAKPOINT_PX = 1025
let activeScrollAnimationFrame: number | null = null

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
  const rawTarget =
    element.getBoundingClientRect().top +
    window.scrollY -
    scrollMarginTop +
    getExtraSectionOffset(hash)

  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(maxScrollY, Math.max(0, rawTarget))
}

const getFrameScrollY = (value: number, targetY: number) => {
  if (value < targetY) {
    return Math.floor(value)
  }
  if (value > targetY) {
    return Math.ceil(value)
  }
  return value
}

const getDuration = (distance: number) => {
  const proposed = Math.abs(distance) * DURATION_PER_PX
  return Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, proposed))
}

const smoothScrollToElement = (element: HTMLElement, hash: string) => {
  if (activeScrollAnimationFrame) {
    cancelAnimationFrame(activeScrollAnimationFrame)
    activeScrollAnimationFrame = null
  }

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
    const currentY =
      progress === 1
        ? targetY
        : getFrameScrollY(startY + distance * easedProgress, targetY)

    window.scrollTo({ top: currentY, behavior: 'auto' })

    if (progress < 1) {
      activeScrollAnimationFrame = requestAnimationFrame(step)
    } else {
      activeScrollAnimationFrame = null
    }
  }

  activeScrollAnimationFrame = requestAnimationFrame(step)
}

export default function Navbar() {
  const navLinks = [
    { href: '/#about', label: 'ABOUT' },
    { href: '/#work', label: 'WORK' },
    { href: '/#play', label: 'PLAY' }
  ]

  return (
    <div className='pointer-events-none fixed inset-x-0 top-0 z-50 [overflow-anchor:none]'>
      <div className='relative pb-12'>
        <div
          aria-hidden
          className='navbar-scrim pointer-events-none absolute inset-x-0 top-0 bottom-0'
        />
        <nav className='font-primary pointer-events-auto relative flex w-full flex-row items-center justify-between gap-4 px-6 py-3.5 text-base font-medium tablet:px-8 tablet:py-4'>
        <div className='flex flex-col items-start leading-tight tablet:flex-row tablet:items-center tablet:gap-2'>
          <div>jagat sachdeva</div>
          <div className='hidden text-[#A1A1A1] tablet:block'>design engineer</div>
        </div>
        <div className='flex flex-row items-center gap-5'>
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
              className='italic font-medium tracking-wide text-[#A1A1A1] uppercase transition-colors hover:text-white'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      </div>
    </div>
  )
}
