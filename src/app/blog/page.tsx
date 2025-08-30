import Link from 'next/link'
import { Calendar, ArrowRight, Tag } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      id: '61-nsl',
      title: "#61 NSL",
      date: "April 8, 2023",
      excerpt: "Working at Sibley Music Library - a note left by a former student worker",
      categories: ["Classical Guitar", "Rochester, NY"]
    },
    {
      id: '60-sweet-d-flat',
      title: "#60 Sweet D-Flat",
      date: "October 17, 2022",
      excerpt: "Discusses musical key associations and reflects on 'sweet' music and favorite pieces",
      categories: ["Classical Guitar", "How it all started"]
    },
    {
      id: '59-chorei',
      title: "#59 Chorei",
      date: "May 7, 2022",
      excerpt: "Personal narrative about bike riding and experiencing unexpected emotions",
      categories: ["Uncategorized"]
    },
    {
      id: '58-ernest-shand',
      title: "#58 Ernest Shand",
      date: "March 15, 2022",
      excerpt: "Reflections on musical influences and mentorship",
      categories: ["Classical Guitar", "Back in the Day"]
    },
    {
      id: '57-the-lick',
      title: "#57 The Lick",
      date: "January 20, 2022",
      excerpt: "Exploring the famous jazz lick and its appearances across genres",
      categories: ["Classical Guitar", "How it all started"]
    }
  ]

  const categories = [
    "Back in the Day",
    "Classical Guitar",
    "Classical Guitar Vinyls",
    "Funny Vinyls",
    "How it all started",
    "Mandolin",
    "Reggae",
    "Rochester, NY",
    "Uncategorized",
    "Vinyls"
  ]

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Thoughts on music, instruments, and the ongoing journey of musical discovery.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {posts.map((post) => (
                  <article key={post.id} className="relative">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700">
                      <Link href={`/blog/${post.id}`} className="hover:text-gray-600">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            <Tag className="h-3 w-3" />
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
                <button
                  disabled
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-400"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">Page 1 of 1</span>
                <button
                  disabled
                  className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-400"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Categories */}
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                <div className="mt-8 rounded-lg bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Blog</h3>
                  <p className="text-sm text-gray-600">
                    Personal reflections on music, instruments, memories, and musical experiences 
                    from a classical guitarist and mandolinist's perspective.
                  </p>
                </div>

                {/* Subscribe */}
                <div className="mt-8 rounded-lg bg-blue-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get notified when new posts are published.
                  </p>
                  <form className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}