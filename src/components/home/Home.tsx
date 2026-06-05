'use client'

import { polaroidImages } from '@/components/home/polaroidImages'
import MiniResume from '@/components/shared/MiniResume'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuCheck, LuCopy } from 'react-icons/lu'

interface Polaroid {
  id: number
  x: number
  y: number
  rotation: number
  image: StaticImageData
  lifetimeMs: number
  exiting?: boolean
  /** Ambient pops: build up and hold indefinitely (cleared only on cursor move). */
  holdUntilReplaced?: boolean
}

// Pixels of cursor travel between each dropped polaroid.
const SPAWN_DISTANCE = 150
const MOBILE_SPAWN_INTERVAL_MS = 750
const DESKTOP_AUTO_SPAWN_INTERVAL_MS = 750
/** Resume ambient pops after the cursor stops moving in the polaroid zone. */
const POINTER_IDLE_MS = 2800
const TABLET_MIN_WIDTH_PX = 768
const POLAROID_EXPAND_MS = 120
const POLAROID_HOLD_MS = 500
const POLAROID_EXIT_MS = 220
const POLAROID_LIFETIME =
  POLAROID_EXPAND_MS + POLAROID_HOLD_MS + POLAROID_EXIT_MS
/** Desktop: ambient stack drops out of the page when the cursor takes over. */
const POLAROID_FALL_MS = 750
/** Slight per-card offset so the stack doesn't drop in perfect lockstep. */
const POLAROID_FALL_STAGGER_MS = 45
const getFallDelayMs = (id: number) => (id % 4) * POLAROID_FALL_STAGGER_MS
/** Continue the card's tilt into a tumble as it falls (direction follows tilt). */
const getFallSpinDeg = (id: number, rotation: number) =>
  (rotation >= 0 ? 1 : -1) * (80 + (id % 5) * 12)
/** Mobile: a touch that moves less than this counts as a tap (vs. a scroll). */
const TAP_MOVE_TOLERANCE_PX = 12

// Half-size estimates (frame + max rotation) used to keep cards inside the stage.
const POLAROID_HALF_W = 92
const POLAROID_HALF_H = 106
const MOBILE_POLAROID_HALF_W = 72
const MOBILE_POLAROID_HALF_H = 96
// Top & sides may overflow, but at least this fraction of each card stays on-screen.
const MIN_POLAROID_ON_SCREEN = 0.8

const getPolaroidHalfDims = (mobile: boolean) =>
  mobile
    ? { halfW: MOBILE_POLAROID_HALF_W, halfH: MOBILE_POLAROID_HALF_H }
    : { halfW: POLAROID_HALF_W, halfH: POLAROID_HALF_H }

const getSpawnLimits = (mobile: boolean, boundsW: number, boundsH: number) => {
  const { halfW, halfH } = getPolaroidHalfDims(mobile)
  // Inset that leaves MIN_POLAROID_ON_SCREEN of the card visible at top/sides
  // (e.g. 0.8 → center sits 60% of the half-size in, so only 20% overflows).
  const visibleInset = (half: number) => half * (2 * MIN_POLAROID_ON_SCREEN - 1)
  return {
    minX: visibleInset(halfW),
    maxX: boundsW - visibleInset(halfW),
    minY: visibleInset(halfH),
    // Bottom keeps the full half-height margin so cards never spill into the heading.
    maxY: boundsH - halfH
  }
}

/** Place each ambient pop in the least-crowded grid cell so photos spread across the stage. */
const pickDispersedAmbientPosition = (
  mobile: boolean,
  boundsW: number,
  boundsH: number,
  existing: Polaroid[]
) => {
  const { minX, maxX, minY, maxY } = getSpawnLimits(mobile, boundsW, boundsH)
  const width = maxX - minX
  const height = maxY - minY
  if (width <= 0 || height <= 0) {
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 }
  }

  const cols = mobile ? 3 : 5
  const rows = mobile ? 4 : 2
  const cellW = width / cols
  const cellH = height / rows
  const cellCount = cols * rows

  const occupancy = Array<number>(cellCount).fill(0)
  for (const p of existing) {
    // Ignore cards already falling away so a rebuild disperses freshly.
    if (!p.holdUntilReplaced || p.exiting) continue
    const col = Math.min(
      cols - 1,
      Math.max(0, Math.floor((p.x - minX) / cellW))
    )
    const row = Math.min(
      rows - 1,
      Math.max(0, Math.floor((p.y - minY) / cellH))
    )
    occupancy[row * cols + col] += 1
  }

  const minOccupancy = Math.min(...occupancy)
  const cellIndices = Array.from({ length: cellCount }, (_, i) => i)
  for (let i = cellIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]]
  }

  let chosenCell = cellIndices.find(i => occupancy[i] === minOccupancy) ?? 0
  for (const i of cellIndices) {
    if (occupancy[i] === 0) {
      chosenCell = i
      break
    }
  }

  const col = chosenCell % cols
  const row = Math.floor(chosenCell / cols)
  const insetX = cellW * 0.12
  const insetY = cellH * 0.12

  return {
    x:
      minX +
      col * cellW +
      insetX +
      Math.random() * Math.max(0, cellW - insetX * 2),
    y:
      minY +
      row * cellH +
      insetY +
      Math.random() * Math.max(0, cellH - insetY * 2)
  }
}

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [polaroids, setPolaroids] = useState<Polaroid[]>([])
  const polaroidsRef = useRef<Polaroid[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const interactionBoundsRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const distanceRef = useRef(0)
  const nextIdRef = useRef(0)
  const imageIndexRef = useRef(0)
  const pointerActiveRef = useRef(false)
  const desktopAutoSpawnEnabledRef = useRef(true)

  const removePolaroidById = useCallback((id: number) => {
    setPolaroids(prev => prev.filter(p => p.id !== id))
  }, [])

  const dismissAmbientPolaroids = useCallback(() => {
    setPolaroids(prev => {
      const toDismiss = prev.filter(p => p.holdUntilReplaced && !p.exiting)
      if (toDismiss.length === 0) return prev

      const exitIds = new Set(toDismiss.map(p => p.id))
      for (const p of toDismiss) {
        setTimeout(
          () => removePolaroidById(p.id),
          POLAROID_FALL_MS + getFallDelayMs(p.id)
        )
      }
      return prev.map(p => (exitIds.has(p.id) ? { ...p, exiting: true } : p))
    })
  }, [removePolaroidById])

  const spawnPolaroid = useCallback(
    (x: number, y: number, kind: 'ambient' | 'trail' = 'ambient') => {
      const id = nextIdRef.current++
      const rotation = Math.random() * 40 - 20
      const image =
        polaroidImages[imageIndexRef.current % polaroidImages.length]
      imageIndexRef.current += 1

      if (kind === 'ambient') {
        // Ambient pops build up one photo at a time and hold indefinitely — no
        // count cap and no exit timer. They only leave when the cursor moves
        // (dismissAmbientPolaroids); the spawn interval stops once every photo
        // has been placed, so the stage simply fills and stays.
        setPolaroids(prev => [
          ...prev,
          {
            id,
            x,
            y,
            rotation,
            image,
            lifetimeMs: POLAROID_EXPAND_MS,
            holdUntilReplaced: true
          }
        ])
        return
      }

      setPolaroids(prev => [
        ...prev,
        { id, x, y, rotation, image, lifetimeMs: POLAROID_LIFETIME }
      ])
      setTimeout(() => {
        removePolaroidById(id)
      }, POLAROID_LIFETIME)
    },
    [removePolaroidById]
  )

  const spawnPolaroidRef = useRef(spawnPolaroid)
  const dismissAmbientPolaroidsRef = useRef(dismissAmbientPolaroids)

  // Keep the refs read by the pointer/interval handlers pointed at the latest
  // state and callbacks (synced after commit so the handlers never read stale ones).
  useEffect(() => {
    polaroidsRef.current = polaroids
    spawnPolaroidRef.current = spawnPolaroid
    dismissAmbientPolaroidsRef.current = dismissAmbientPolaroids
  })

  // Warm the browser cache with every polaroid up front so each pop renders
  // instantly instead of triggering a network fetch on spawn. Assets are served
  // with immutable cache headers, so this only ever fetches each image once.
  useEffect(() => {
    const preloaders = polaroidImages.map(({ src }) => {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = src
      return img
    })
    return () => {
      // Drop refs so the GC can reclaim them; cached bytes stay in the HTTP cache.
      preloaders.forEach(img => {
        img.src = ''
      })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const interactionBounds = interactionBoundsRef.current
    if (!container || !content || !interactionBounds) return

    const updateInteractionBounds = () => {
      const mobile = window.innerWidth < TABLET_MIN_WIDTH_PX
      if (mobile) {
        interactionBounds.style.left = ''
        interactionBounds.style.width = ''
        interactionBounds.style.height = ''
        return
      }

      const containerRect = container.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const safeInset = 16
      interactionBounds.style.left = `${contentRect.left - containerRect.left}px`
      interactionBounds.style.width = `${contentRect.width}px`
      interactionBounds.style.height = `${Math.max(0, contentRect.top - containerRect.top - safeInset)}px`
    }

    updateInteractionBounds()
    const resizeObserver = new ResizeObserver(updateInteractionBounds)
    resizeObserver.observe(container)
    resizeObserver.observe(content)
    window.addEventListener('resize', updateInteractionBounds)

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    let pointerIdleTimeoutId: ReturnType<typeof setTimeout> | undefined

    const scheduleDesktopAutoSpawnResume = () => {
      if (window.innerWidth < TABLET_MIN_WIDTH_PX) return
      clearTimeout(pointerIdleTimeoutId)
      pointerIdleTimeoutId = setTimeout(() => {
        // Rewind the photo sequence so the idle build-up starts fresh from
        // the first image and fills the stage again.
        imageIndexRef.current = 0
        desktopAutoSpawnEnabledRef.current = true
      }, POINTER_IDLE_MS)
    }

    const spawnDesktopTrailAt = (
      x: number,
      y: number,
      boundsW: number,
      boundsH: number
    ) => {
      const { minX, maxX, minY, maxY } = getSpawnLimits(false, boundsW, boundsH)
      if (maxX <= minX || maxY <= minY) return
      spawnPolaroidRef.current(
        clamp(x, minX, maxX),
        clamp(y, minY, maxY),
        'trail'
      )
    }

    /** First trail pop as soon as the cursor leaves auto-spawn (no extra travel). */
    const engageDesktopTrail = (
      x: number,
      y: number,
      boundsW: number,
      boundsH: number
    ) => {
      desktopAutoSpawnEnabledRef.current = false
      if (polaroidsRef.current.some(p => p.holdUntilReplaced && !p.exiting)) {
        dismissAmbientPolaroidsRef.current()
      }
      scheduleDesktopAutoSpawnResume()
      spawnDesktopTrailAt(x, y, boundsW, boundsH)
      distanceRef.current = 0
      lastPosRef.current = { x, y }
    }

    const handlePointerEnter = (e: PointerEvent) => {
      if (window.innerWidth < TABLET_MIN_WIDTH_PX) return
      if (e.pointerType !== 'mouse') return
      const boundsRect = interactionBounds.getBoundingClientRect()
      lastPosRef.current = {
        x: e.clientX - boundsRect.left,
        y: e.clientY - boundsRect.top
      }
      distanceRef.current = 0
    }

    const handlePointerMove = (e: PointerEvent) => {
      // Mobile gets no cursor-driven pops — it only runs the auto build-up.
      if (window.innerWidth < TABLET_MIN_WIDTH_PX) return

      const boundsRect = interactionBounds.getBoundingClientRect()
      const boundsW = boundsRect.width
      const boundsH = boundsRect.height

      // Ignore mouse movement while a button is held (dragging / selecting), not touch.
      if (e.pointerType === 'mouse' && e.buttons !== 0) {
        lastPosRef.current = {
          x: e.clientX - boundsRect.left,
          y: e.clientY - boundsRect.top
        }
        return
      }

      const x = e.clientX - boundsRect.left
      const y = e.clientY - boundsRect.top

      const last = lastPosRef.current
      if (!last) {
        if (e.pointerType === 'mouse' && desktopAutoSpawnEnabledRef.current) {
          engageDesktopTrail(x, y, boundsW, boundsH)
        } else {
          lastPosRef.current = { x, y }
        }
        return
      }

      const dx = x - last.x
      const dy = y - last.y
      if (dx === 0 && dy === 0) return

      if (e.pointerType === 'mouse' && desktopAutoSpawnEnabledRef.current) {
        engageDesktopTrail(x, y, boundsW, boundsH)
        return
      }

      distanceRef.current += Math.hypot(dx, dy)
      lastPosRef.current = { x, y }

      if (distanceRef.current >= SPAWN_DISTANCE) {
        distanceRef.current = 0
        spawnDesktopTrailAt(x, y, boundsW, boundsH)
      }
    }

    const handlePointerLeave = () => {
      lastPosRef.current = null
      distanceRef.current = 0
      scheduleDesktopAutoSpawnResume()
    }

    // Track the touch start so we can tell a mobile tap from a scroll.
    let tapStart: { x: number; y: number } | null = null

    const resetPointer = () => {
      pointerActiveRef.current = false
      lastPosRef.current = null
      distanceRef.current = 0
    }

    const handlePointerDown = (e: PointerEvent) => {
      pointerActiveRef.current = true
      tapStart =
        window.innerWidth < TABLET_MIN_WIDTH_PX
          ? { x: e.clientX, y: e.clientY }
          : null
    }

    const handlePointerUp = (e: PointerEvent) => {
      resetPointer()
      // Mobile tap: drop the whole collage with the fall, then rebuild from empty.
      if (tapStart) {
        const moved = Math.hypot(e.clientX - tapStart.x, e.clientY - tapStart.y)
        if (moved < TAP_MOVE_TOLERANCE_PX) {
          dismissAmbientPolaroidsRef.current()
          imageIndexRef.current = 0
        }
      }
      tapStart = null
    }

    const handlePointerCancel = () => {
      resetPointer()
      tapStart = null
    }

    interactionBounds.addEventListener('pointerenter', handlePointerEnter)
    interactionBounds.addEventListener('pointermove', handlePointerMove)
    interactionBounds.addEventListener('pointerleave', handlePointerLeave)
    interactionBounds.addEventListener('pointerdown', handlePointerDown)
    interactionBounds.addEventListener('pointerup', handlePointerUp)
    interactionBounds.addEventListener('pointercancel', handlePointerCancel)
    return () => {
      clearTimeout(pointerIdleTimeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateInteractionBounds)
      interactionBounds.removeEventListener('pointerenter', handlePointerEnter)
      interactionBounds.removeEventListener('pointermove', handlePointerMove)
      interactionBounds.removeEventListener('pointerleave', handlePointerLeave)
      interactionBounds.removeEventListener('pointerdown', handlePointerDown)
      interactionBounds.removeEventListener('pointerup', handlePointerUp)
      interactionBounds.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [])

  useEffect(() => {
    const interactionBounds = interactionBoundsRef.current
    if (!interactionBounds) return

    const mobileMq = window.matchMedia(
      `(max-width: ${TABLET_MIN_WIDTH_PX - 1}px)`
    )
    const reducedMotionMq = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )
    let intervalId: ReturnType<typeof setInterval> | undefined

    const spawnRandomPolaroid = (mobile: boolean) => {
      const boundsW = interactionBounds.offsetWidth
      const boundsH = interactionBounds.offsetHeight
      const { minX, maxX, minY, maxY } = getSpawnLimits(
        mobile,
        boundsW,
        boundsH
      )
      if (maxX <= minX || maxY <= minY) return
      if (pointerActiveRef.current) return

      const { x, y } = pickDispersedAmbientPosition(
        mobile,
        boundsW,
        boundsH,
        polaroidsRef.current
      )
      spawnPolaroidRef.current(x, y, 'ambient')
    }

    // Build up one photo per tick until the whole sequence has been placed.
    const allPhotosPlaced = () => imageIndexRef.current >= polaroidImages.length

    const tick = () => {
      if (reducedMotionMq.matches) return
      if (allPhotosPlaced()) return
      if (mobileMq.matches) {
        spawnRandomPolaroid(true)
        return
      }
      if (!desktopAutoSpawnEnabledRef.current) return
      spawnRandomPolaroid(false)
    }

    const start = () => {
      clearInterval(intervalId)
      if (reducedMotionMq.matches) return
      const ms = mobileMq.matches
        ? MOBILE_SPAWN_INTERVAL_MS
        : DESKTOP_AUTO_SPAWN_INTERVAL_MS
      intervalId = setInterval(tick, ms)
    }

    const stop = () => {
      clearInterval(intervalId)
      intervalId = undefined
    }

    const handleMqChange = () => {
      stop()
      desktopAutoSpawnEnabledRef.current = true
      // Rewind the sequence so the new breakpoint fills the stage from scratch.
      imageIndexRef.current = 0
      if (mobileMq.matches) {
        setPolaroids([])
      }
      start()
    }

    start()
    mobileMq.addEventListener('change', handleMqChange)
    reducedMotionMq.addEventListener('change', handleMqChange)

    return () => {
      stop()
      mobileMq.removeEventListener('change', handleMqChange)
      reducedMotionMq.removeEventListener('change', handleMqChange)
    }
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jagatsachdeva05@gmail.com')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }
  return (
    <div
      ref={containerRef}
      className='tablet:h-dvh tablet:justify-end tablet:p-16 relative box-border flex w-full flex-col overflow-visible p-6'
    >
      <div
        ref={interactionBoundsRef}
        className='tablet:absolute tablet:top-0 tablet:z-[5] tablet:h-auto tablet:max-h-none tablet:min-h-0 tablet:w-auto tablet:touch-auto tablet:overflow-visible tablet:shrink relative z-20 h-[50vh] max-h-[420px] min-h-[280px] w-full shrink-0 touch-auto overflow-visible'
        aria-hidden
      >
        <div className='pointer-events-none absolute inset-0 overflow-visible'>
          {polaroids.map(p => (
            <div
              key={p.id}
              className={`absolute ${p.exiting ? 'animate-polaroid-fall' : ''}`}
              style={
                {
                  left: p.x,
                  top: p.y,
                  // Tilt + spin live in CSS vars so the fall keyframe can both
                  // start from the resting tilt and tumble onward from it.
                  transform: 'translate(-50%, -50%) rotate(var(--tilt))',
                  '--tilt': `${p.rotation}deg`,
                  '--fall-spin': `${getFallSpinDeg(p.id, p.rotation)}deg`,
                  ...(p.exiting
                    ? {
                        animationDuration: `${POLAROID_FALL_MS}ms`,
                        animationDelay: `${getFallDelayMs(p.id)}ms`
                      }
                    : null)
                } as CSSProperties
              }
            >
              <div
                className={
                  p.holdUntilReplaced
                    ? 'animate-polaroid-enter origin-center'
                    : 'animate-polaroid-lifecycle origin-center'
                }
                style={{
                  animationDuration: p.holdUntilReplaced
                    ? `${POLAROID_EXPAND_MS}ms`
                    : `${p.lifetimeMs}ms`
                }}
              >
                <div className='tablet:p-3 tablet:pb-10 flex flex-col rounded-xl bg-[color-mix(in_srgb,white_50%,var(--color-neutral-200))] p-2 pb-6 shadow-lg'>
                  <div className='tablet:size-40 relative size-32 overflow-hidden rounded-sm bg-neutral-200'>
                    <Image
                      src={p.image}
                      alt=''
                      fill
                      sizes='(max-width: 767px) 128px, 160px'
                      className='object-cover'
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={contentRef}
        className='tablet:z-0 tablet:mt-0 tablet:gap-9 relative z-10 flex w-full flex-col gap-5'
      >
        <h1 className='font-primary tablet:text-6xl text-4xl'>
          I’m a design engineer.
          <span className='tablet:text-[3.7rem] text-[2.25rem]'></span>
        </h1>

        <div className='tablet:flex-row tablet:items-start desktop:grid desktop:grid-cols-2 desktop:items-start desktop:gap-24 flex w-full flex-col gap-10'>
          <div className='font-secondary desktop:text-base tablet:mb-0 desktop:gap-3.5 mb-4 flex flex-col gap-3 text-sm text-neutral-400'>
            <p>
              I strive to build experiences that quietly slip into
              someone&apos;s day and leave them feeling understood. Earning that
              kind of trust guides everything I do.
            </p>
            <p>
              I hope you enjoy your time here. Please reach out anytime at{' '}
              <span className='inline-flex items-center gap-2 text-white'>
                jagatsachdeva05@gmail.com
                <button
                  onClick={handleCopyEmail}
                  className='cursor-pointer transition-colors active:scale-95'
                  aria-label='Copy email to clipboard'
                >
                  {copied ? (
                    <LuCheck className='size-5 cursor-default! text-neutral-400' />
                  ) : (
                    <LuCopy className='size-4 text-neutral-400 hover:text-white' />
                  )}
                </button>
              </span>
            </p>
          </div>
          <div className='tablet:flex hidden w-full'>
            <MiniResume />
          </div>
        </div>
        <div className='tablet:justify-start tablet:space-x-6 flex items-center justify-center space-x-8'>
          <Link
            href='https://linkedin.com/in/jagat-sachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='tablet:text-xl text-3xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaLinkedin />
          </Link>
          <Link
            href='https://github.com/jsachdeva7'
            target='_blank'
            rel='noopener noreferrer'
            className='tablet:text-xl text-3xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaGithub />
          </Link>
          <Link
            href='https://x.com/JagatSachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='tablet:text-xl text-3xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaXTwitter />
          </Link>
          <Link
            href='https://www.instagram.com/jagatsachdeva/'
            target='_blank'
            rel='noopener noreferrer'
            className='tablet:text-xl text-3xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  )
}
