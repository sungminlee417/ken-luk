import Link from 'next/link'
import { Mail } from 'lucide-react'
import { client } from '../../../../sanity/lib/client'
import { contactInfoQuery } from '../../../../sanity/lib/queries'
import ContactForm from './ContactForm'

interface ContactInfo {
  _id: string
  title: string
  subtitle: string
  email: string
  instagram?: string
  instagramUrl?: string
  youtube?: string
  youtubeUrl?: string
  contactFormTitle: string
  formSubjects: string[]
  bookingInfoTitle: string
  bookingInfoDescription: string
  bookingRequirements: string[]
}

async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    return await client.fetch(contactInfoQuery)
  } catch (error) {
    console.error('Error fetching contact info:', error)
    return null
  }
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  // Fallback data if Sanity is not configured
  const defaultContactInfo: ContactInfo = {
    _id: 'default',
    title: 'Get in Touch',
    subtitle: "Don't hesitate to reach out for performances, lessons, collaborations, or just to say hello.",
    email: 'kenlukmusic@gmail.com',
    instagram: 'guitarfluke',
    instagramUrl: 'https://www.instagram.com/guitarfluke',
    youtube: 'Ken Luk Music',
    youtubeUrl: 'https://www.youtube.com/channel/UC6H1C9G2WEWwo1yE53Xg0iA',
    contactFormTitle: 'Send a Message',
    formSubjects: ['Performance Inquiry', 'Lesson Request', 'Collaboration', 'General Inquiry'],
    bookingInfoTitle: 'Booking Information',
    bookingInfoDescription: 'For performance bookings, please include:',
    bookingRequirements: [
      'Event date and location',
      'Type of event',
      'Performance duration',
      'Technical requirements',
      'Budget range (if applicable)'
    ]
  }

  const info = contactInfo || defaultContactInfo

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
            {info.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {info.subtitle}
          </p>

          {/* Contact Information */}
          <div className="mt-12 space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4 hover-lift transition-all duration-300">
              <Mail className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <Link
                  href={`mailto:${info.email}`}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {info.email}
                </Link>
              </div>
            </div>

            {info.instagram && info.instagramUrl && (
              <div className="flex items-center gap-4 hover-lift transition-all duration-300">
                <div className="h-6 w-6 flex items-center justify-center">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2"/>
                    <path d="M17.5 6.5h.01" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Instagram</p>
                  <Link
                    href={info.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    @{info.instagram}
                  </Link>
                </div>
              </div>
            )}

            {info.youtube && info.youtubeUrl && (
              <div className="flex items-center gap-4 hover-lift transition-all duration-300">
                <div className="h-6 w-6 flex items-center justify-center">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">YouTube</p>
                  <Link
                    href={info.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {info.youtube}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-bold text-foreground mb-8">{info.contactFormTitle}</h2>
            <ContactForm email={info.email} formSubjects={info.formSubjects} />
          </div>

          {/* Additional Information */}
          <div className="mt-16 rounded-lg bg-muted/50 p-8 border border-border hover-lift transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">{info.bookingInfoTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {info.bookingInfoDescription}
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {info.bookingRequirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}