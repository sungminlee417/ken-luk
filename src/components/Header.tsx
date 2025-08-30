'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Music } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Recordings', href: '/recordings' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-card/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-border transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center group">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-foreground hover:text-primary transition-colors">
              <Music className="h-7 w-7 text-amber-600 group-hover:text-amber-500 transition-colors" />
              Ken Luk
            </Link>
            <span className="ml-4 text-sm text-muted-foreground hidden sm:block">
              Classical Guitarist. Mandolinist.
            </span>
          </div>
          <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-0.5 bg-amber-600 transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close' : 'Open'} main menu</span>
              <div className="relative w-6 h-6">
                <Menu className={`h-6 w-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} aria-hidden="true" />
                <X className={`h-6 w-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>
        <div className={`lg:hidden border-t border-border transition-all duration-300 ease-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1 py-3">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 px-4 text-base font-medium rounded-md mx-2 transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}