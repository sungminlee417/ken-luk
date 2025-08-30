import React from 'react'
import Link from 'next/link'
import { ExternalLink, Disc2, Play } from 'lucide-react'
import { client } from '../../../../sanity/lib/client'
import { recordingsQuery, siteSettingsQuery } from '../../../../sanity/lib/queries'
import VideoModal from './VideoModal'
import YouTubeThumbnail from './YouTubeThumbnail'

interface Recording {
  _id: string
  title: string
  artist: string
  releaseDate: string
  description?: string
  recordingType?: 'video' | 'album' | 'single' | 'ep'
  bandcampUrl?: string
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  isUpcoming: boolean
  featured: boolean
  coverImage?: any
}

interface SiteSettings {
  _id: string
  socialLinks: {
    instagram?: string
    youtube?: string
    email?: string
  }
  author: {
    instagram?: string
    youtube?: string
    email?: string
  }
}

async function getRecordings(): Promise<Recording[]> {
  try {
    return await client.fetch(recordingsQuery)
  } catch (error) {
    console.error('Error fetching recordings:', error)
    return []
  }
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}


export default async function RecordingsPage() {
  const allRecordings = await getRecordings()
  const siteSettings = await getSiteSettings()
  
  const upcomingRecordings = allRecordings.filter(r => r.isUpcoming)
  const pastRecordings = allRecordings.filter(r => !r.isUpcoming)
  const videoRecordings = pastRecordings.filter(r => r.recordingType === 'video' || (r.youtubeUrl && !r.recordingType))
  const albumRecordings = pastRecordings.filter(r => 
    r.recordingType === 'album' || 
    r.recordingType === 'single' || 
    r.recordingType === 'ep' ||
    (r.bandcampUrl || r.spotifyUrl || r.appleMusicUrl) && r.recordingType !== 'video'
  )

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center gap-3 animate-fade-in-up">
            <Disc2 className="h-12 w-12 text-primary" />
            Recordings
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A collection of recordings spanning classical guitar, mandolin, reggae, and experimental music.
          </p>

          {/* Upcoming Releases */}
          {upcomingRecordings.length > 0 && (
            <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingRecordings.map((recording, index) => (
                  <div
                    key={recording._id}
                    className="relative bg-muted/50 rounded-lg border border-border p-6 hover-lift transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <span className="inline-flex rounded-full bg-warning/10 text-warning border border-warning/20 px-3 py-1 text-xs font-medium mb-4">
                      Coming {new Date(recording.releaseDate).getFullYear()}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {recording.artist} – {recording.title}
                    </h3>
                    {recording.description && (
                      <p className="text-sm text-muted-foreground">{recording.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Recordings */}
          {videoRecordings.length > 0 && (
            <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8">Video Recordings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoRecordings.map((recording, index) => (
                  <VideoModal key={recording._id} recording={recording}>
                    <div className="group relative bg-muted/30 rounded-lg overflow-hidden border border-border hover:bg-muted/50 transition-all duration-300 cursor-pointer hover-lift animate-scale-in" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                        {recording.youtubeUrl && (
                          <YouTubeThumbnail
                            url={recording.youtubeUrl}
                            alt={`${recording.artist} - ${recording.title}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative bg-red-600 text-white p-4 rounded-full group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {new Date(recording.releaseDate).getFullYear()}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {recording.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{recording.artist}</p>
                      </div>
                    </div>
                  </VideoModal>
                ))}
              </div>
            </div>
          )}

          {/* Audio Recordings */}
          {albumRecordings.length > 0 && (
            <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-2xl font-bold text-foreground mb-8">Audio Recordings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {albumRecordings.map((recording, index) => (
                  <div
                    key={recording._id}
                    className="bg-muted/30 rounded-lg p-6 border border-border hover:bg-muted/50 transition-all duration-300 hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-warning rounded-lg flex items-center justify-center">
                        <Disc2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {new Date(recording.releaseDate).getFullYear()}
                        </p>
                        <h3 className="font-semibold text-foreground mb-1">
                          {recording.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{recording.artist}</p>
                        {recording.description && (
                          <p className="text-sm text-muted-foreground mb-3">{recording.description}</p>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          {recording.bandcampUrl && (
                            <Link
                              href={recording.bandcampUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-md transition-colors"
                            >
                              Bandcamp <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                          {recording.spotifyUrl && (
                            <Link
                              href={recording.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
                            >
                              Spotify <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                          {recording.appleMusicUrl && (
                            <Link
                              href={recording.appleMusicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors"
                            >
                              Apple Music <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Streaming Platforms */}
          <div className="mt-16 border-t border-border pt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Find My Music On</h3>
            <div className="flex flex-wrap gap-4">
              {siteSettings?.author?.youtube && (
                <Link
                  href={`https://www.youtube.com/channel/${siteSettings.author.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover-lift"
                >
                  YouTube
                </Link>
              )}
              {albumRecordings.length > 0 && (
                <Link
                  href={albumRecordings[0]?.bandcampUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover-lift"
                >
                  Bandcamp
                </Link>
              )}
              {pastRecordings.some(r => r.spotifyUrl) && (
                <Link
                  href={pastRecordings.find(r => r.spotifyUrl)?.spotifyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover-lift"
                >
                  Spotify
                </Link>
              )}
              {pastRecordings.some(r => r.appleMusicUrl) && (
                <Link
                  href={pastRecordings.find(r => r.appleMusicUrl)?.appleMusicUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gray-600 hover:bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover-lift"
                >
                  Apple Music
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}