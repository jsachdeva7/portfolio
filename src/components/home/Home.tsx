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
}

// Pixels of cursor travel between each dropped polaroid.
const SPAWN_DISTANCE = 150
const POLAROID_EXPAND_MS = 120
const POLAROID_HOLD_MS = 500
const POLAROID_EXIT_MS = 220
// Total lifetime; keyframe % in globals.css (8%, 41.33%) must match these durations.
const POLAROID_LIFETIME =
  POLAROID_EXPAND_MS + POLAROID_HOLD_MS + POLAROID_EXIT_MS
// Half-size estimate so polaroids stay inside the padded interaction bounds.
const POLAROID_HALF_W = 92
const POLAROID_HALF_H = 106

export default function Home() {
  const [copied, setCopied] = useState(false)
  const [polaroids, setPolaroids] = useState<Polaroid[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const interactionBoundsRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const distanceRef = useRef(0)
  const nextIdRef = useRef(0)
  const imageIndexRef = useRef(0)

  const spawnPolaroid = useCallback((x: number, y: number) => {
    const id = nextIdRef.current++
    const rotation = Math.random() * 40 - 20
    const image =
      polaroidImages[imageIndexRef.current % polaroidImages.length]
    imageIndexRef.current += 1
    setPolaroids((prev) => [...prev, { id, x, y, rotation, image }])
    setTimeout(() => {
      setPolaroids((prev) => prev.filter((p) => p.id !== id))
    }, POLAROID_LIFETIME)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const interactionBounds = interactionBoundsRef.current
    if (!container || !content || !interactionBounds) return

    const updateInteractionBounds = () => {
      const containerRect = container.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      interactionBounds.style.left = `${contentRect.left - containerRect.left}px`
      interactionBounds.style.width = `${contentRect.width}px`
      interactionBounds.style.height = `${Math.max(0, contentRect.top - containerRect.top)}px`
    }

    updateInteractionBounds()
    const resizeObserver = new ResizeObserver(updateInteractionBounds)
    resizeObserver.observe(container)
    resizeObserver.observe(content)
    window.addEventListener('resize', updateInteractionBounds)

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const handleMouseMove = (e: MouseEvent) => {
      const boundsRect = interactionBounds.getBoundingClientRect()
      const boundsW = boundsRect.width
      const boundsH = boundsRect.height

      // Ignore movement while a button is held (dragging / selecting).
      if (e.buttons !== 0) {
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
        lastPosRef.current = { x, y }
        return
      }

      const dx = x - last.x
      const dy = y - last.y
      distanceRef.current += Math.hypot(dx, dy)
      lastPosRef.current = { x, y }

      if (distanceRef.current >= SPAWN_DISTANCE) {
        distanceRef.current = 0
        spawnPolaroid(
          clamp(x, POLAROID_HALF_W, boundsW - POLAROID_HALF_W),
          clamp(y, POLAROID_HALF_H, boundsH - POLAROID_HALF_H)
        )
      }
    }

    const handleMouseLeave = () => {
      lastPosRef.current = null
      distanceRef.current = 0
    }

    interactionBounds.addEventListener('mousemove', handleMouseMove)
    interactionBounds.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateInteractionBounds)
      interactionBounds.removeEventListener('mousemove', handleMouseMove)
      interactionBounds.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [spawnPolaroid])

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
      className='relative box-border flex h-dvh w-full flex-col justify-end overflow-visible p-6 tablet:p-16'
    >
      <div
        ref={interactionBoundsRef}
        className='absolute top-0 z-[5] overflow-visible'
        aria-hidden
      >
        <div className='pointer-events-none absolute inset-0 overflow-visible'>
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
              className='animate-polaroid-lifecycle origin-center'
              style={{ animationDuration: `${POLAROID_LIFETIME}ms` }}
            >
              <div className='rounded-xl flex flex-col bg-[color-mix(in_srgb,white_50%,var(--color-neutral-200))] p-3 pb-10 shadow-lg'>
                <div className='relative size-40 overflow-hidden rounded-sm bg-neutral-200'>
                  <Image
                    src={p.image}
                    alt=''
                    fill
                    sizes='160px'
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
        className='relative z-0 flex w-full flex-col gap-9'
      >
        <h1 className='font-primary tablet:text-6xl text-4xl'>
          I’m a design engineer.
     
          <span className='tablet:text-[3.7rem] text-[2.25rem]'></span>
        </h1>

        <div className='tablet:flex-row tablet:items-start flex w-full flex-col gap-10 desktop:grid desktop:grid-cols-2 desktop:items-start desktop:gap-24'>
          <div className='font-secondary desktop:text-base flex flex-col gap-3 text-sm text-neutral-400 desktop:gap-3.5'>
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
          <div className='flex w-full'>
            <MiniResume />
          </div>
        </div>
        <div className='tablet:justify-start tablet:space-x-6 flex items-center justify-center space-x-8'>
              <Link
                href='https://linkedin.com/in/jagat-sachdeva'
                target='_blank'
                rel='noopener noreferrer'
                className='tablet:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
              >
                <FaLinkedin />
              </Link>
              <Link
                href='https://github.com/jsachdeva7'
                target='_blank'
                rel='noopener noreferrer'
                className='tablet:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
              >
                <FaGithub />
              </Link>
              <Link
                href='https://x.com/JagatSachdeva'
                target='_blank'
                rel='noopener noreferrer'
                className='tablet:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
              >
                <FaXTwitter />
              </Link>
              <Link
                href='https://www.instagram.com/jagatsachdeva/'
                target='_blank'
                rel='noopener noreferrer'
                className='tablet:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
              >
                <FaInstagram />
              </Link>
        </div>
      </div>
    </div>
  )
}
