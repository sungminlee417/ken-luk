import Link from 'next/link'
import { Calendar, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { client } from '../../../../sanity/lib/client'
import { categoriesQuery } from '../../../../sanity/lib/queries'
import { groq } from 'next-sanity'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  categories: Array<{
    title: string
    slug: { current: string }
  }>
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

const POSTS_PER_PAGE = 10

const paginatedPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    categories[]->{
      title,
      slug
    }
  }
`

const totalPostsQuery = groq`
  count(*[_type == "post"])
`

const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0..4] {
    _id,
    title,
    slug,
    publishedAt
  }
`

async function getBlogData(page: number = 1) {
  try {
    const start = (page - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE

    const [posts, categories, totalPosts, recentPosts] = await Promise.all([
      client.fetch(paginatedPostsQuery, { start, end }),
      client.fetch(categoriesQuery),
      client.fetch(totalPostsQuery),
      client.fetch(recentPostsQuery)
    ])

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    return { posts, categories, totalPosts, totalPages, currentPage: page, recentPosts }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return { posts: [], categories: [], totalPosts: 0, totalPages: 0, currentPage: 1, recentPosts: [] }
  }
}

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const { posts, categories, totalPosts, totalPages, currentPage, recentPosts } = await getBlogData(page)

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl animate-fade-in-up">
            Blog
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Personal reflections on music, instruments, memories, and musical experiences from a classical guitarist and mandolinist's journey.
          </p>
          
          {totalPosts > 0 && (
            <p className="mt-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {totalPosts} posts total • Page {currentPage} of {totalPages}
            </p>
          )}

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {posts.map((post: Post, index: number) => (
                  <article key={post._id} className="relative group animate-fade-in-up" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      <Link href={`/blog/${post.slug.current}`} className="hover:text-primary">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {post.categories?.map((category) => (
                          <Link
                            key={category.slug.current}
                            href={`/blog/category/${category.slug.current}`}
                            className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            <Tag className="h-3 w-3" />
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-3"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 border-t border-border pt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
                  <nav className="flex items-center justify-between">
                    <div className="flex flex-1 justify-between sm:hidden">
                      {/* Mobile pagination */}
                      <Link
                        href={`/blog${currentPage > 1 ? `?page=${currentPage - 1}` : ''}`}
                        className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          currentPage <= 1
                            ? 'text-muted-foreground cursor-not-allowed'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        {...(currentPage <= 1 && { 'aria-disabled': true })}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Link>
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          currentPage >= totalPages
                            ? 'text-muted-foreground cursor-not-allowed'
                            : 'text-foreground hover:bg-muted'
                        }`}
                        {...(currentPage >= totalPages && { 'aria-disabled': true })}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Showing{' '}
                          <span className="font-medium">{(currentPage - 1) * POSTS_PER_PAGE + 1}</span>
                          {' '}to{' '}
                          <span className="font-medium">
                            {Math.min(currentPage * POSTS_PER_PAGE, totalPosts)}
                          </span>
                          {' '}of{' '}
                          <span className="font-medium">{totalPosts}</span> posts
                        </p>
                      </div>
                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                          {/* Previous button */}
                          <Link
                            href={`/blog${currentPage > 1 ? `?page=${currentPage - 1}` : ''}`}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-sm font-medium transition-colors ${
                              currentPage <= 1
                                ? 'text-muted-foreground cursor-not-allowed bg-muted'
                                : 'text-foreground hover:bg-muted bg-background border border-border'
                            }`}
                            {...(currentPage <= 1 && { 'aria-disabled': true })}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" />
                          </Link>
                          
                          {/* Page numbers */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                            const isCurrentPage = pageNum === currentPage
                            const showPage = 
                              pageNum === 1 || 
                              pageNum === totalPages || 
                              Math.abs(pageNum - currentPage) <= 2
                            
                            if (!showPage) {
                              if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                                return (
                                  <span
                                    key={pageNum}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground"
                                  >
                                    ...
                                  </span>
                                )
                              }
                              return null
                            }
                            
                            return (
                              <Link
                                key={pageNum}
                                href={`/blog${pageNum > 1 ? `?page=${pageNum}` : ''}`}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors border border-border ${
                                  isCurrentPage
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-foreground hover:bg-muted bg-background'
                                }`}
                              >
                                {pageNum}
                              </Link>
                            )
                          })}
                          
                          {/* Next button */}
                          <Link
                            href={`/blog?page=${currentPage + 1}`}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-sm font-medium transition-colors ${
                              currentPage >= totalPages
                                ? 'text-muted-foreground cursor-not-allowed bg-muted'
                                : 'text-foreground hover:bg-muted bg-background border border-border'
                            }`}
                            {...(currentPage >= totalPages && { 'aria-disabled': true })}
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </nav>
                      </div>
                    </div>
                  </nav>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="sticky top-24">
                {/* Categories */}
                <div className="rounded-lg bg-muted/50 p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category: Category) => (
                      <li key={category._id}>
                        <Link
                          href={`/blog/category/${category.slug.current}`}
                          className="text-sm text-muted-foreground hover:text-primary block py-1 transition-colors duration-300 hover:translate-x-1"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                <div className="mt-8 rounded-lg bg-muted/50 p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-lg font-semibold text-foreground mb-4">About This Blog</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Personal reflections on music, instruments, memories, and musical experiences 
                    from a classical guitarist and mandolinist's perspective. Stories from decades 
                    of musical journey, vinyl collecting, and teaching.
                  </p>
                </div>

                {/* Recent Posts */}
                <div className="mt-8 rounded-lg bg-muted/50 p-6 border border-border hover-lift transition-all duration-300">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Latest Posts</h3>
                  <ul className="space-y-3">
                    {recentPosts.map((post: any, index: number) => (
                      <li key={post._id}>
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}