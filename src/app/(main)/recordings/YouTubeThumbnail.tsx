'use client'

interface YouTubeThumbnailProps {
  url: string
  alt: string
  className?: string
}

function getVideoId(url: string): string | null {
  // Handle individual video URLs
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (videoIdMatch) {
    return videoIdMatch[1]
  }
  
  // Handle playlist URLs - try to extract a video ID from the URL if present
  // This works for URLs like: https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
  const playlistVideoMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (playlistVideoMatch) {
    return playlistVideoMatch[1]
  }
  
  // For playlists without a specific video, we can't easily get a thumbnail
  // without making API calls to YouTube, so return null
  return null
}

function getPlaylistId(url: string): string | null {
  const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/)
  return playlistMatch ? playlistMatch[1] : null
}

export default function YouTubeThumbnail({ url, alt, className = '' }: YouTubeThumbnailProps) {
  const videoId = getVideoId(url)
  const playlistId = getPlaylistId(url)
  
  // If we have a video ID (either direct video or playlist with specific video), use video thumbnail
  if (videoId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    return (
      <img
        src={thumbnailUrl}
        alt={alt}
        className={className}
      />
    )
  }
  
  // If we have a playlist but no specific video, create a simple playlist indicator
  if (playlistId) {
    return (
      <div className={`${className} bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center relative overflow-hidden`}>
        {/* Background pattern to mimic video thumbnails */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-3 left-3 w-12 h-8 bg-white rounded-sm"></div>
          <div className="absolute top-12 left-6 w-10 h-6 bg-white rounded-sm"></div>
          <div className="absolute top-20 left-3 w-12 h-8 bg-white rounded-sm"></div>
          <div className="absolute top-6 right-3 w-10 h-6 bg-white rounded-sm"></div>
          <div className="absolute top-16 right-6 w-12 h-8 bg-white rounded-sm"></div>
        </div>
      </div>
    )
  }
  
  // No video ID or playlist ID found
  return null
}