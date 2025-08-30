import Link from 'next/link'
import { client } from '../../../../sanity/lib/client'
import { siteInfoQuery } from '../../../../sanity/lib/queries'
import PortableText from '@/components/PortableText'

interface SiteInfo {
  _id: string
  title: string
  purpose: string
  content: any[]
}

async function getSiteInfo(): Promise<SiteInfo | null> {
  try {
    return await client.fetch(siteInfoQuery)
  } catch (error) {
    console.error('Error fetching site info:', error)
    return null
  }
}

export default async function AboutSitePage() {
  const siteInfo = await getSiteInfo()

  if (!siteInfo) {
    return (
      <div className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About This Site
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Loading content...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
            <span className="gradient-text">{siteInfo.title}</span>
          </h1>
          
          {siteInfo.purpose && (
            <div className="mt-8 p-6 bg-muted rounded-lg hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-2 w-2 bg-primary rounded-full"></span>
                Purpose
              </h2>
              <p className="text-muted-foreground italic">
                "{siteInfo.purpose}"
              </p>
            </div>
          )}

          {siteInfo.content && siteInfo.content.length > 0 && (
            <div className="mt-12 prose prose-lg max-w-none animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <PortableText value={siteInfo.content} className="text-muted-foreground space-y-6" />
            </div>
          )}

          {/* Back to site */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-300 hover-lift"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'About This Site | Ken Luk Music',
  description: 'Learn about the purpose and technology behind Ken Luk\'s music website.',
}