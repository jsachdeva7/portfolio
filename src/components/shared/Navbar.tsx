'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/work', label: 'STUFF' }
    // { href: '/thoughts', label: 'THOUGHTS' },
    // { href: '/about', label: 'ABOUT' }
  ]

  return (
    <div className='desktop:pt-0 sticky top-0 z-50 flex w-full justify-center pt-3'>
      <nav className='font-tertiary desktop:w-full desktop:justify-between desktop:rounded-none desktop:border-0 desktop:border-b desktop:border-white/5 desktop:bg-neutral-950/60 desktop:px-8 desktop:py-4 desktop:text-base flex flex-row items-center justify-center gap-8 rounded-full border border-white/10 bg-neutral-900/80 px-8 py-3.5 text-base font-medium backdrop-blur-xl'>
        <div className='desktop:flex hidden flex-row items-center gap-4'>
          <div>JAGAT SACHDEVA</div>
          <div className='text-[#A1A1A1]'>PRODUCT ENGINEER</div>
        </div>
        <div className='flex flex-row items-center gap-8'>
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-light tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-[#A1A1A1] hover:text-[#D0D0D0]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
