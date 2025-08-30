import Link from 'next/link'
import { Home, ArrowLeft, Music } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          {/* Animated 404 */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <Music className="h-16 w-16 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="text-6xl font-bold text-foreground animate-fade-in-up">
              404
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for seems to have wandered off like a melody in the wind. 
              Let's get you back to the music.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-300 hover-lift"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all duration-300 hover-lift"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse Blog
            </Link>
          </div>
          
          {/* Fun musical note */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-6xl text-primary/20 animate-pulse">
              ♪ ♫ ♪
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: '404 - Page Not Found | Ken Luk Music',
  description: 'The page you are looking for could not be found.',
}