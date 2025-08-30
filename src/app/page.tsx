import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Music, Disc, Calendar } from 'lucide-react'

export default function Home() {
  const recentPosts = [
    { id: 1, title: "#61 NSL", date: "April 8, 2023", excerpt: "Working at Sibley Music Library - a note left by a former student worker" },
    { id: 2, title: "#60 Sweet D-Flat", date: "October 17, 2022", excerpt: "Discusses musical key associations and reflects on 'sweet' music and favorite pieces" },
    { id: 3, title: "#59 Chorei", date: "May 7, 2022", excerpt: "Personal narrative about bike riding and experiencing unexpected emotions" },
  ]

  const featuredRecordings = [
    { title: "Janus Guitar Duo – Issus", year: "2025", status: "upcoming" },
    { title: "fivebyfive – Sonidos de Tlön", year: "2025", status: "upcoming" },
    { title: "fivebyfive – Eclipse", year: "2024", status: "recent" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Ken Luk
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Classical Guitarist. Mandolinist.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Exploring the intersection of classical tradition and contemporary expression through strings.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/recordings"
                className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Explore Recordings
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recordings */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
              <Disc className="h-8 w-8" />
              Latest Recordings
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRecordings.map((recording) => (
                <div
                  key={recording.title}
                  className="group relative bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      recording.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {recording.status === 'upcoming' ? 'Upcoming' : 'Recent'}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {recording.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{recording.year}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/recordings"
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 flex items-center justify-center gap-2"
              >
                View all recordings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
              <Music className="h-8 w-8" />
              Recent Thoughts
            </h2>
            <div className="mt-8 space-y-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="relative group">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                    <Link href={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-gray-600">{post.excerpt}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="text-sm font-semibold text-gray-900 hover:text-gray-700 flex items-center justify-center gap-2"
              >
                Read all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Let's Connect
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're interested in performances, collaborations, or just want to say hello.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}