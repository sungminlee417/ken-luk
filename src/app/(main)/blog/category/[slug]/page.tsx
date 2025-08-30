import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { client } from '../../../../../../sanity/lib/client'
import { groq } from 'next-sanity'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

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

const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  }
`

const categoryPostsQuery = groq`
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
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

async function getCategoryData(slug: string) {
  try {
    const [category, posts] = await Promise.all([
      client.fetch(categoryQuery, { slug }),
      client.fetch(categoryPostsQuery, { slug })
    ])
    return { category, posts }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return { category: null, posts: [] }
  }
}

export async function generateStaticParams() {
  const categoriesQuery = groq`*[_type == "category"]{ slug }`
  try {
    const categories = await client.fetch(categoriesQuery)
    return categories.map((category: any) => ({
      slug: category.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const { category, posts } = await getCategoryData(resolvedParams.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:gap-3 transition-all duration-300 mb-8 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Category</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <span className="gradient-text">{category.title}</span>
          </h1>
          {category.description && (
            <p className="mt-6 text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {category.description}
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="space-y-12">
            {posts.map((post: Post, index: number) => (
              <article key={post._id} className="relative group animate-fade-in-up" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
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
                    {post.categories?.map((postCategory) => (
                      <Link
                        key={postCategory.slug.current}
                        href={`/blog/category/${postCategory.slug.current}`}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                          postCategory.slug.current === category.slug.current
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
                        }`}
                      >
                        <Tag className="h-3 w-3" />
                        {postCategory.title}
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
        ) : (
          <div className="text-center py-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-foreground mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              There are no posts in the "{category.title}" category yet.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:gap-3"
            >
              <ArrowLeft className="h-4 w-4" />
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}