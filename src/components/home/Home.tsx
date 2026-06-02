'use client'

import MiniResume from '@/components/shared/MiniResume'
import Link from 'next/link'
import { useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { LuCheck, LuCopy } from 'react-icons/lu'

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
    <div className='box-border flex h-dvh w-full flex-col justify-end p-6 tablet:p-16'>
      <div className='flex w-full flex-col gap-9'>
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
              I hope you enjoy your time here! Please reach out anytime at{' '}
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
