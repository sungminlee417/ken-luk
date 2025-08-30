import Link from 'next/link'
import { ExternalLink, Disc2 } from 'lucide-react'

export default function RecordingsPage() {
  const upcomingRecordings = [
    { title: "Janus Guitar Duo – Issus", artist: "Janus Guitar Duo", year: "2025", description: "New compositions for guitar duo" },
    { title: "fivebyfive – Sonidos de Tlön", artist: "fivebyfive", year: "2025", description: "Experimental soundscapes" },
  ]

  const recordings = [
    { 
      title: "Eclipse", 
      artist: "fivebyfive", 
      year: "2024",
      description: "Contemporary classical explorations",
      links: {}
    },
    { 
      title: "Breath and Fire", 
      artist: "fivebyfive", 
      year: "2023",
      description: "Dynamic compositions for modern ensemble",
      links: {}
    },
    { 
      title: "Play Album", 
      artist: "fivebyfive", 
      year: "2023",
      description: "Playful interpretations of classical themes",
      links: {}
    },
    { 
      title: "Amor Imperfeito", 
      artist: "Mauro Marcondes and Zéjorge, Rosa Boemia", 
      year: "2022",
      description: "Brazilian music collaboration",
      links: {}
    },
    { 
      title: "Francisco", 
      artist: "Mauro Marcondes and Rosa Boemia", 
      year: "2022",
      description: "Traditional and contemporary Brazilian fusion",
      links: {}
    },
    { 
      title: "Unity is Dub", 
      artist: "Mosaic Foundation", 
      year: "2021",
      description: "Reggae and dub explorations",
      links: {}
    },
    { 
      title: "Dances and Fantasies", 
      artist: "Trio Ghidorah", 
      year: "2021",
      description: "Classical guitar trio performances",
      links: {}
    },
    { 
      title: "Christmas Time is Here", 
      artist: "Janus Duo", 
      year: "2020",
      description: "Holiday classics reimagined for guitar duo",
      links: {}
    },
    { 
      title: "Passages", 
      artist: "Janus Duo", 
      year: "2020",
      description: "Contemporary works for two guitars",
      links: {}
    },
    { 
      title: "Unity is Strength", 
      artist: "Mosaic Foundation", 
      year: "2018",
      description: "Reggae roots and conscious music",
      links: { bandcamp: "https://bandcamp.com" }
    },
    { 
      title: "Reuptake", 
      artist: "Neuroceptor", 
      year: "2014",
      description: "Experimental electronic and acoustic fusion",
      links: { bandcamp: "https://bandcamp.com" }
    },
    { 
      title: "Signs of the Time", 
      artist: "Mosaic Foundation", 
      year: "2013",
      description: "Social commentary through reggae",
      links: {}
    },
    { 
      title: "Neuroceptor", 
      artist: "Neuroceptor", 
      year: "2012",
      description: "Debut experimental album",
      links: {}
    },
    { 
      title: "Do Right", 
      artist: "Mosaic Foundation", 
      year: "2012",
      description: "Positive vibrations and conscious lyrics",
      links: { bandcamp: "https://bandcamp.com" }
    },
    { 
      title: "Mosaic Foundation", 
      artist: "Mosaic Foundation", 
      year: "2011",
      description: "Self-titled debut reggae album",
      links: { bandcamp: "https://bandcamp.com" }
    },
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl flex items-center gap-3">
            <Disc2 className="h-12 w-12" />
            Recordings
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            A collection of recordings spanning classical guitar, mandolin, reggae, and experimental music.
          </p>

          {/* Upcoming Releases */}
          {upcomingRecordings.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Releases</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {upcomingRecordings.map((recording) => (
                  <div
                    key={recording.title}
                    className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
                  >
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 mb-4">
                      Coming {recording.year}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {recording.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{recording.artist}</p>
                    {recording.description && (
                      <p className="mt-2 text-sm text-gray-600">{recording.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Released Albums */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Discography</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recordings.map((recording) => (
                <div
                  key={`${recording.title}-${recording.year}`}
                  className="group relative bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 mb-2">{recording.year}</p>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                        {recording.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600">{recording.artist}</p>
                      {recording.description && (
                        <p className="mt-2 text-sm text-gray-600">{recording.description}</p>
                      )}
                    </div>
                  </div>
                  {recording.links && Object.keys(recording.links).length > 0 && (
                    <div className="mt-4 flex gap-2">
                      {recording.links.bandcamp && (
                        <Link
                          href={recording.links.bandcamp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          Bandcamp <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Streaming Platforms */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Find My Music On</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Spotify
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Apple Music
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Bandcamp
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC6H1C9G2WEWwo1yE53Xg0iA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}