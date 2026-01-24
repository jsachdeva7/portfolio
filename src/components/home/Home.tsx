'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuCheck, LuCopy } from 'react-icons/lu'
import deltaU from './assets/deltaU.jpg'
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
    <div className='relative h-full w-full'>
      <div className='absolute bottom-0 left-0 flex w-1/2 flex-col gap-6'>
        <h1 className='font-primary mb-5 text-7xl'>
          Hey, I&apos;m Jagat<span className='text-[4.25rem]'>!</span>
        </h1>
        <p className='font-secondary mb-3 text-xl text-neutral-400'>
          I'm a customer-first{' '}
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
                <LuCheck className='size-5 !cursor-default text-neutral-400' />
              ) : (
                <LuCopy className='size-4 text-neutral-400 hover:text-white' />
              )}
            </button>
          </span>
        </p>
        <div className='flex items-center space-x-6'>
          <Link
            href='https://linkedin.com/in/jagat-sachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaLinkedin />
          </Link>
          <Link
            href='https://github.com/jsachdeva7'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaGithub />
          </Link>
          <Link
            href='https://x.com/JagatSachdeva'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaXTwitter />
          </Link>
          <Link
            href='https://www.instagram.com/jagatsachdeva/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xl text-neutral-400 transition-colors hover:text-white'
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
      <div className='absolute top-[-3em] right-0 p-16'>
        <div className='relative'>
          {/* Top/Back Image - puertoRico */}
          <div className='relative -rotate-3 transition-transform duration-500 hover:scale-105 hover:-rotate-6'>
            <Image
              src={puertoRico}
              alt='Puerto Rico'
              width={280}
              height={350}
              className='rounded-2xl shadow-2xl'
              priority
            />
          </div>
          {/* Bottom/Front Image - deltaU */}
          <div className='absolute -bottom-15 -left-30 rotate-3 transition-transform duration-500 hover:scale-105 hover:rotate-6'>
            <Image
              src={deltaU}
              alt='Delta U'
              width={220}
              height={280}
              className='rounded-2xl shadow-2xl'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
