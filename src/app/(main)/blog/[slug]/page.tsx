import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { client } from '../../../../../sanity/lib/client'
import { postQuery } from '../../../../../sanity/lib/queries'
import { groq } from 'next-sanity'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  body: any[]
  author: {
    name: string
    image?: any
  }
  categories: Array<{
    title: string
    slug: { current: string }
  }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(postQuery, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateStaticParams() {
  const slugsQuery = groq`*[_type == "post"]{ slug }`
  try {
    const posts = await client.fetch(slugsQuery)
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <img
            src={value.asset.url}
            alt={value.alt || ''}
            className="rounded-lg w-full"
          />
        </div>
      )
    },
    span: ({ value }: any) => {
      // Handle span types that might come from our migration
      return <span>{value.text || ''}</span>
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-5 mb-2 text-foreground">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2 text-foreground">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
  },
  // Add unknowns handler to gracefully handle any unknown types
  unknownType: ({ value, isInline }: any) => {
    if (isInline) {
      return <span style={{ color: 'red' }}>Unknown inline type: {JSON.stringify(value)}</span>
    }
    return <div style={{ color: 'red' }}>Unknown block type: {JSON.stringify(value)}</div>
  },
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
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

        <article className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              <span className="gradient-text">{post.title}</span>
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {post.excerpt}
              </p>
            )}

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                {post.categories.map((category, index) => (
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
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <PortableText value={post.body} components={portableTextComponents} />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 hover-lift transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
              </div>

              <Link
                href="/blog"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-300"
              >
                View all posts →
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}