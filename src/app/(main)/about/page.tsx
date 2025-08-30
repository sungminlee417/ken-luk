import Image from 'next/image'
import Link from 'next/link'
import { client } from '../../../../sanity/lib/client'
import { authorQuery } from '../../../../sanity/lib/queries'
import { urlForImage } from '../../../../sanity/lib/image'
import PortableText from '@/components/PortableText'

interface AuthorData {
  _id: string
  name: string
  title: string
  bio: any[]
  email: string
  instagram: string
  youtube: string
  image?: any
  education?: Array<{
    degree: string
    institution: string
    details?: string
  }>
  organizations?: Array<{
    role: string
    organization: string
  }>
  teachingPositions?: Array<{
    subject: string
    institution: string
  }>
  musicalGroups?: Array<{
    group: string
    role?: string
  }>
  achievements?: Array<{
    title: string
    year?: string
    description?: string
  }>
}

async function getAuthor(): Promise<AuthorData | null> {
  try {
    return await client.fetch(authorQuery)
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}

export default async function AboutPage() {
  const author = await getAuthor()

  if (!author) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Ken Luk
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Loading content...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
              About <span className="gradient-text">{author.name}</span>
            </h1>
            <p className="mt-6 text-xl font-medium text-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {author.title}
            </p>
          </div>

          {author.image && (
            <div className="mx-auto max-w-md mb-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative aspect-square rounded-lg overflow-hidden hover-lift">
                <Image
                  src={urlForImage(author.image)?.width(400).height(400).url() || ''}
                  alt={author.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Photograph by Gerry Szymanski
              </p>
            </div>
          )}
          
          <div className="prose prose-lg max-w-none animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <PortableText value={author.bio} className="text-muted-foreground space-y-6" />
          </div>

          <div className="mt-16 border-t border-border pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              {author.education && author.education.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Education
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {author.education.map((edu, index) => (
                      <li key={index} className="pl-4 border-l-2 border-primary/20">
                        <div className="font-medium text-foreground">{edu.degree}</div>
                        <div className="text-sm text-muted-foreground mt-1">{edu.institution}</div>
                        {edu.details && (
                          <div className="text-sm text-muted-foreground/80 mt-2 italic">
                            {edu.details}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Organizations */}
              {author.organizations && author.organizations.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Organizations
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {author.organizations.map((org, index) => (
                      <li key={index} className="pl-4 border-l-2 border-primary/20">
                        <div className="font-medium text-foreground">{org.role}</div>
                        <div className="text-sm text-muted-foreground mt-1">{org.organization}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Teaching Positions */}
              {author.teachingPositions && author.teachingPositions.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Teaching Positions
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {author.teachingPositions.map((pos, index) => (
                      <li key={index} className="pl-4 border-l-2 border-primary/20">
                        <div className="font-medium text-foreground">{pos.subject}</div>
                        <div className="text-sm text-muted-foreground mt-1">{pos.institution}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Musical Groups */}
              {author.musicalGroups && author.musicalGroups.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                    Musical Groups
                  </h3>
                  <ul className="space-y-4 text-muted-foreground">
                    {author.musicalGroups.map((group, index) => (
                      <li key={index} className="pl-4 border-l-2 border-primary/20">
                        <div className="font-medium text-foreground">{group.group}</div>
                        {group.role && (
                          <div className="text-sm text-muted-foreground mt-1">{group.role}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Achievements */}
            {author.achievements && author.achievements.length > 0 && (
              <div className="mt-12 bg-muted rounded-lg p-8 hover-lift transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 bg-primary rounded-full"></span>
                  Achievements
                </h3>
                <div className="space-y-3">
                  {author.achievements.map((achievement, index) => (
                    <div key={index}>
                      <p className="text-muted-foreground">
                        {achievement.title}
                        {achievement.year && ` (${achievement.year})`}
                      </p>
                      {achievement.description && (
                        <p className="text-sm text-muted-foreground/80 mt-1">
                          {achievement.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              <h3 className="text-xl font-semibold text-foreground mb-4">Connect</h3>
              <p className="text-muted-foreground mb-6">
                For performance inquiries, lessons, or collaborations, please get in touch.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-300 hover-lift"
              >
                Contact Ken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}