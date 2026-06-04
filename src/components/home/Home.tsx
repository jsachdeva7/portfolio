'use client'

import { polaroidImages } from '@/components/home/polaroidImages'
import MiniResume from '@/components/shared/MiniResume'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  /** Ambient pops: hold until replaced (overlap stack). */
  holdUntilReplaced?: boolean
}

// Pixels of cursor travel between each dropped polaroid.
const SPAWN_DISTANCE = 150
const MOBILE_SPAWN_INTERVAL_MS = 750
const DESKTOP_AUTO_SPAWN_INTERVAL_MS = 750
/** Resume ambient pops after the cursor stops moving in the polaroid zone. */
const POINTER_IDLE_MS = 2800
const DESKTOP_AMBIENT_MAX_ACTIVE = 10
const MOBILE_AMBIENT_MAX_ACTIVE = 10
const TABLET_MIN_WIDTH_PX = 768
const POLAROID_EXPAND_MS = 120
const POLAROID_HOLD_MS = 500
const POLAROID_EXIT_MS = 220
const POLAROID_LIFETIME =
  POLAROID_EXPAND_MS + POLAROID_HOLD_MS + POLAROID_EXIT_MS
/** Desktop ambient stack: photos exit when the next one pushes past max (no timer). */
const DESKTOP_AMBIENT_VISIBLE_MS = POLAROID_EXPAND_MS
/** Mobile ambient: timer hold before exit (overlap also caps count). */
const MOBILE_AMBIENT_HOLD_MS = 5000
const MOBILE_AMBIENT_VISIBLE_MS = POLAROID_EXPAND_MS + MOBILE_AMBIENT_HOLD_MS
// Half-size estimates so polaroids stay inside the interaction bounds.
const POLAROID_HALF_W = 92
const POLAROID_HALF_H = 106
const MOBILE_POLAROID_HALF_W = 72
/** Includes frame + max rotation so clamps keep the full card inside the stage. */
const MOBILE_POLAROID_HALF_H = 96
const MOBILE_SPAWN_EDGE_PAD = 16

const getPolaroidHalfDims = (mobile: boolean) =>
  mobile
    ? { halfW: MOBILE_POLAROID_HALF_W, halfH: MOBILE_POLAROID_HALF_H }
    : { halfW: POLAROID_HALF_W, halfH: POLAROID_HALF_H }

const getSpawnLimits = (
  mobile: boolean,
  boundsW: number,
  boundsH: number
) => {
  const { halfW, halfH } = getPolaroidHalfDims(mobile)
  const pad = mobile ? MOBILE_SPAWN_EDGE_PAD : 0
  return {
    minX: halfW + pad,
    maxX: boundsW - halfW - pad,
    minY: halfH + pad,
    maxY: boundsH - halfH - pad
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
    if (!p.holdUntilReplaced) continue
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

  let chosenCell = cellIndices.find((i) => occupancy[i] === minOccupancy) ?? 0
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
  polaroidsRef.current = polaroids

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const interactionBoundsRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const distanceRef = useRef(0)
  const nextIdRef = useRef(0)
  const imageIndexRef = useRef(0)
  const pointerActiveRef = useRef(false)
  const desktopAutoSpawnEnabledRef = useRef(true)
  const ambientExpiryTimersRef = useRef(
    new Map<number, ReturnType<typeof setTimeout>>()
  )

  const removePolaroidById = useCallback((id: number) => {
    setPolaroids((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const clearAmbientTimer = useCallback((id: number) => {
    const timer = ambientExpiryTimersRef.current.get(id)
    if (timer) clearTimeout(timer)
    ambientExpiryTimersRef.current.delete(id)
  }, [])

  const startPolaroidExit = useCallback(
    (id: number) => {
      setPolaroids((prev) =>
        prev.map((p) =>
          p.id === id && !p.exiting ? { ...p, exiting: true } : p
        )
      )
      setTimeout(() => removePolaroidById(id), POLAROID_EXIT_MS)
    },
    [removePolaroidById]
  )

  const scheduleAmbientExpiry = useCallback(
    (id: number, visibleMs: number) => {
      clearAmbientTimer(id)
      const timer = setTimeout(() => {
        ambientExpiryTimersRef.current.delete(id)
        startPolaroidExit(id)
      }, visibleMs)
      ambientExpiryTimersRef.current.set(id, timer)
    },
    [clearAmbientTimer, startPolaroidExit]
  )

  const dismissAmbientPolaroids = useCallback(() => {
    setPolaroids((prev) => {
      const toDismiss = prev.filter((p) => p.holdUntilReplaced && !p.exiting)
      if (toDismiss.length === 0) return prev

      const exitIds = new Set(toDismiss.map((p) => p.id))
      for (const p of toDismiss) {
        clearAmbientTimer(p.id)
        setTimeout(() => removePolaroidById(p.id), POLAROID_EXIT_MS)
      }
      return prev.map((p) => (exitIds.has(p.id) ? { ...p, exiting: true } : p))
    })
  }, [clearAmbientTimer, removePolaroidById])

  const spawnPolaroid = useCallback(
    (
      x: number,
      y: number,
      kind: 'ambient' | 'trail' = 'ambient',
      mobile = window.innerWidth < TABLET_MIN_WIDTH_PX
    ) => {
      const id = nextIdRef.current++
      const rotation = Math.random() * 40 - 20
      const image =
        polaroidImages[imageIndexRef.current % polaroidImages.length]
      imageIndexRef.current += 1

      if (kind === 'ambient') {
        const maxActive = mobile
          ? MOBILE_AMBIENT_MAX_ACTIVE
          : DESKTOP_AMBIENT_MAX_ACTIVE
        const ambientVisibleMs = mobile
          ? MOBILE_AMBIENT_VISIBLE_MS
          : DESKTOP_AMBIENT_VISIBLE_MS

        setPolaroids((prev) => {
          const activeAmbient = prev.filter(
            (p) => p.holdUntilReplaced && !p.exiting
          )
          const toExitCount = Math.max(
            0,
            activeAmbient.length - (maxActive - 1)
          )
          const toExit = activeAmbient.slice(0, toExitCount)
          const toExitIds = new Set(toExit.map((p) => p.id))

          for (const p of toExit) {
            clearAmbientTimer(p.id)
            setTimeout(() => removePolaroidById(p.id), POLAROID_EXIT_MS)
          }

          const withExiting = prev.map((p) =>
            toExitIds.has(p.id) ? { ...p, exiting: true } : p
          )
          return [
            ...withExiting,
            {
              id,
              x,
              y,
              rotation,
              image,
              lifetimeMs: ambientVisibleMs,
              holdUntilReplaced: true
            }
          ]
        })
        if (mobile) {
          scheduleAmbientExpiry(id, ambientVisibleMs)
        }
        return
      }

      setPolaroids((prev) => [
        ...prev,
        { id, x, y, rotation, image, lifetimeMs: POLAROID_LIFETIME }
      ])
      setTimeout(() => {
        removePolaroidById(id)
      }, POLAROID_LIFETIME)
    },
    [
      clearAmbientTimer,
      removePolaroidById,
      scheduleAmbientExpiry
    ]
  )

  const spawnPolaroidRef = useRef(spawnPolaroid)
  const dismissAmbientPolaroidsRef = useRef(dismissAmbientPolaroids)
  spawnPolaroidRef.current = spawnPolaroid
  dismissAmbientPolaroidsRef.current = dismissAmbientPolaroids

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
        'trail',
        false
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
      if (
        polaroidsRef.current.some(
          (p) => p.holdUntilReplaced && !p.exiting
        )
      ) {
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
      const boundsRect = interactionBounds.getBoundingClientRect()
      const boundsW = boundsRect.width
      const boundsH = boundsRect.height
      const mobile = window.innerWidth < TABLET_MIN_WIDTH_PX

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
        if (
          !mobile &&
          e.pointerType === 'mouse' &&
          desktopAutoSpawnEnabledRef.current
        ) {
          engageDesktopTrail(x, y, boundsW, boundsH)
        } else {
          lastPosRef.current = { x, y }
        }
        return
      }

      const dx = x - last.x
      const dy = y - last.y
      if (dx === 0 && dy === 0) return

      if (
        !mobile &&
        e.pointerType === 'mouse' &&
        desktopAutoSpawnEnabledRef.current
      ) {
        engageDesktopTrail(x, y, boundsW, boundsH)
        return
      }

      distanceRef.current += Math.hypot(dx, dy)
      lastPosRef.current = { x, y }

      if (distanceRef.current >= SPAWN_DISTANCE) {
        distanceRef.current = 0
        if (mobile) {
          const { minX, maxX, minY, maxY } = getSpawnLimits(
            true,
            boundsW,
            boundsH
          )
          if (maxX <= minX || maxY <= minY) return
          spawnPolaroidRef.current(
            clamp(x, minX, maxX),
            clamp(y, minY, maxY),
            'ambient',
            true
          )
        } else {
          spawnDesktopTrailAt(x, y, boundsW, boundsH)
        }
      }
    }

    const handlePointerLeave = () => {
      lastPosRef.current = null
      distanceRef.current = 0
      scheduleDesktopAutoSpawnResume()
    }

    const handlePointerDown = () => {
      pointerActiveRef.current = true
    }

    const handlePointerUp = () => {
      pointerActiveRef.current = false
      lastPosRef.current = null
      distanceRef.current = 0
    }

    interactionBounds.addEventListener('pointerenter', handlePointerEnter)
    interactionBounds.addEventListener('pointermove', handlePointerMove)
    interactionBounds.addEventListener('pointerleave', handlePointerLeave)
    interactionBounds.addEventListener('pointerdown', handlePointerDown)
    interactionBounds.addEventListener('pointerup', handlePointerUp)
    interactionBounds.addEventListener('pointercancel', handlePointerUp)
    return () => {
      clearTimeout(pointerIdleTimeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateInteractionBounds)
      interactionBounds.removeEventListener('pointerenter', handlePointerEnter)
      interactionBounds.removeEventListener('pointermove', handlePointerMove)
      interactionBounds.removeEventListener('pointerleave', handlePointerLeave)
      interactionBounds.removeEventListener('pointerdown', handlePointerDown)
      interactionBounds.removeEventListener('pointerup', handlePointerUp)
      interactionBounds.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [])

  useEffect(() => {
    const interactionBounds = interactionBoundsRef.current
    if (!interactionBounds) return

    const mobileMq = window.matchMedia(
      `(max-width: ${TABLET_MIN_WIDTH_PX - 1}px)`
    )
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
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
      spawnPolaroidRef.current(x, y, 'ambient', mobile)
    }

    const tick = () => {
      if (reducedMotionMq.matches) return
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
      className='relative box-border flex w-full flex-col overflow-visible p-6 tablet:h-dvh tablet:justify-end tablet:p-16'
    >
      <div
        ref={interactionBoundsRef}
        className='relative z-[5] h-[50vh] min-h-[280px] max-h-[420px] w-full shrink-0 touch-none overflow-hidden tablet:absolute tablet:top-0 tablet:z-[5] tablet:h-auto tablet:max-h-none tablet:min-h-0 tablet:w-auto tablet:touch-auto tablet:overflow-visible tablet:shrink'
        aria-hidden
      >
        <div className='pointer-events-none absolute inset-0 overflow-hidden tablet:overflow-visible'>
        {polaroids.map((p) => (
          <div
            key={p.id}
            className='absolute'
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`
            }}
          >
            <div
              className={
                p.exiting
                  ? 'animate-polaroid-exit origin-center'
                  : p.holdUntilReplaced
                    ? 'animate-polaroid-enter origin-center'
                    : 'animate-polaroid-lifecycle origin-center'
              }
              style={{
                animationDuration: p.exiting
                  ? `${POLAROID_EXIT_MS}ms`
                  : p.holdUntilReplaced
                    ? `${POLAROID_EXPAND_MS}ms`
                    : `${p.lifetimeMs}ms`
              }}
            >
              <div className='flex flex-col rounded-xl bg-[color-mix(in_srgb,white_50%,var(--color-neutral-200))] p-2 pb-6 shadow-lg tablet:p-3 tablet:pb-10'>
                <div className='relative size-32 overflow-hidden rounded-sm bg-neutral-200 tablet:size-40'>
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
        className='relative z-10 flex w-full flex-col gap-5 tablet:z-0 tablet:mt-0 tablet:gap-9'
      >
        <h1 className='font-primary tablet:text-6xl text-4xl'>
          I’m a design engineer.
     
          <span className='tablet:text-[3.7rem] text-[2.25rem]'></span>
        </h1>

        <div className='tablet:flex-row tablet:items-start flex w-full flex-col gap-10 desktop:grid desktop:grid-cols-2 desktop:items-start desktop:gap-24'>
          <div className='font-secondary desktop:text-base mb-4 flex flex-col gap-3 text-sm text-neutral-400 tablet:mb-0 desktop:gap-3.5'>
            <p>
              I strive to build experiences that quietly slip into someone&apos;s
              day and leave them feeling understood. Earning
              that kind of trust guides everything I do.
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
