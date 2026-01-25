'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuCheck, LuCopy } from 'react-icons/lu'
import deltaU from './assets/deltaU.jpg'
import photosTogether from './assets/PhotosTogether.png'
import puertoRico from './assets/puertoRico.jpg'

export default function Home() {
  const [copied, setCopied] = useState(false)

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
    <div className='desktop:block relative flex h-full w-full flex-col'>
      {/* Images Section - on mobile: first/top, on desktop: absolute top-right */}
      <div className='desktop:absolute desktop:top-[-3em] desktop:right-0 desktop:p-16 desktop:w-auto desktop:pb-0 relative flex w-full justify-center pt-3 pb-11'>
        {/* Mobile: Single combined image */}
        <div className='desktop:hidden relative'>
          <img
            src={photosTogether.src}
            alt='Photos together'
            className='w-full max-w-sm rounded-2xl object-contain shadow-2xl'
          />
        </div>
        {/* Desktop: Two separate overlapping images */}
        <div className='desktop:block relative hidden'>
          <div className='relative -rotate-3 transition-transform duration-500 hover:scale-105 hover:-rotate-6'>
            <img
              src={puertoRico.src}
              alt='Puerto Rico'
              className='h-[350px] w-[280px] rounded-2xl object-cover shadow-2xl'
            />
          </div>
          <div className='absolute -bottom-40 -left-40 rotate-3 transition-transform duration-500 hover:scale-105 hover:rotate-6'>
            <img
              src={deltaU.src}
              alt='Delta U'
              className='h-[280px] w-[220px] rounded-2xl object-cover shadow-2xl'
            />
          </div>
        </div>
      </div>

      {/* Text Section - on mobile: second/bottom, on desktop: absolute bottom-left */}
      <div className='desktop:absolute desktop:bottom-0 desktop:left-0 desktop:w-1/2 flex flex-col gap-6'>
        <h1 className='font-primary desktop:text-7xl mb-2 text-5xl'>
          Hey, I&apos;m Jagat
          <span className='desktop:text-[4.25rem] text-[2.875rem]'>!</span>
        </h1>
        <p className='font-secondary desktop:text-xl desktop:mb-3 mb-6 text-lg text-neutral-400'>
          I&apos;m a customer-first{' '}
          <span className='text-white'>developer designer</span> and end-to-end{' '}
          <span className='text-white'>product builder</span>.
          <br />
          <br />
          Most recently, I was a{' '}
          <span className='text-white'>SWE + Product Intern</span> at an
          Austin-based robotics startup and a{' '}
          <span className='text-white'>Georgia Tech CREATE-X Founder</span>.
          <br />
          <br />I hope you enjoy your time here! Feel free to reach out at{' '}
          <span className='inline-flex items-center gap-2 text-white'>
            jagatsachdeva@gmail.com
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
        <div className='desktop:justify-start desktop:space-x-6 flex items-center justify-center space-x-8'>
          <Link
            href='https://linkedin.com/in/jagat-sachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='desktop:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaLinkedin />
          </Link>
          <Link
            href='https://github.com/jsachdeva7'
            target='_blank'
            rel='noopener noreferrer'
            className='desktop:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaGithub />
          </Link>
          <Link
            href='https://x.com/JagatSachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='desktop:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaXTwitter />
          </Link>
          <Link
            href='https://www.instagram.com/jagatsachdeva/'
            target='_blank'
            rel='noopener noreferrer'
            className='desktop:text-xl text-4xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  )
}
