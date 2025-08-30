import Link from 'next/link'
import { Mail, Music2, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-secondary/80 to-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Music2 className="h-6 w-6 text-amber-600" />
              <span className="text-lg font-semibold text-foreground">Ken Luk Music</span>
            </div>
            <p className="text-sm text-muted-foreground text-center lg:text-left max-w-sm mx-auto lg:mx-0">
              Exploring the intersection of classical tradition and contemporary expression through strings.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase text-center lg:text-left">Quick Links</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center lg:text-left">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">About</Link>
              <Link href="/recordings" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">Recordings</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">Blog</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase text-center lg:text-left">Connect</h3>
            <div className="mt-4 flex justify-center lg:justify-start space-x-6">
              <Link
                href="https://www.instagram.com/guitarfluke"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-muted-foreground hover:text-amber-600 transition-all duration-300"
              >
                <span className="sr-only">Instagram</span>
                <div className="p-2 rounded-full group-hover:bg-amber-50 dark:group-hover:bg-amber-950/20 transition-colors">
                  <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                    <path d="M17.5 6.5h.01" strokeWidth="2"/>
                  </svg>
                </div>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC6H1C9G2WEWwo1yE53Xg0iA"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-muted-foreground hover:text-red-600 transition-all duration-300"
              >
                <span className="sr-only">YouTube</span>
                <div className="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-950/20 transition-colors">
                  <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </Link>
              <Link
                href="mailto:kenlukmusic@gmail.com"
                className="group text-muted-foreground hover:text-blue-600 transition-all duration-300"
              >
                <span className="sr-only">Email</span>
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/20 transition-colors">
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>&copy; {new Date().getFullYear()} Ken Luk Music. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link
                href="/about-site"
                className="hover:text-foreground transition-colors underline"
              >
                About This Site
              </Link>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 animate-pulse" />
                <span>for music</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}