'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, X } from 'lucide-react'

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

function getYouTubeEmbedUrl(url: string): string {
  // Handle playlist URLs
  if (url.includes('playlist?list=')) {
    const listMatch = url.match(/list=([a-zA-Z0-9_-]+)/)
    if (listMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`
    }
  }
  
  // Handle regular video URLs
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (videoIdMatch) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`
  }
  
  // If already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url
  }
  
  return url
}

interface VideoModalProps {
  recording: Recording
  children: React.ReactNode
}

export default function VideoModal({ recording, children }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <div onClick={openModal}>
        {children}
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {recording.artist} – {recording.title}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              {recording.youtubeUrl && (
                <div className="aspect-video mb-4">
                  <iframe
                    src={getYouTubeEmbedUrl(recording.youtubeUrl)}
                    title={`${recording.artist} - ${recording.title}`}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {new Date(recording.releaseDate).getFullYear()}
                </p>
                {recording.description && (
                  <p className="text-muted-foreground">{recording.description}</p>
                )}
                <div className="flex gap-3 flex-wrap">
                  {recording.youtubeUrl && (
                    <Link
                      href={recording.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      YouTube <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {recording.bandcampUrl && (
                    <Link
                      href={recording.bandcampUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      Bandcamp <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {recording.spotifyUrl && (
                    <Link
                      href={recording.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      Spotify <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {recording.appleMusicUrl && (
                    <Link
                      href={recording.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                      Apple Music <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}