'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/work', label: 'WORK' },
    { href: '/thoughts', label: 'THOUGHTS' },
    { href: '/about', label: 'ABOUT' }
  ]

  return (
    <nav className='font-secondary sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b border-neutral-800 bg-neutral-950 px-8 py-4 text-sm'>
      <div className='flex flex-row items-center gap-4'>
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
                isActive ? 'text-white' : 'text-[#A1A1A1]'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
