import Link from "next/link";
import { ArrowRight, Music, Disc, Calendar } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import {
  recordingsQuery,
  postsQuery,
  authorQuery,
  siteSettingsQuery,
} from "../../../sanity/lib/queries";

interface Recording {
  _id: string;
  title: string;
  artist: string;
  releaseDate: string;
  isUpcoming: boolean;
  featured: boolean;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
}

async function getHomePageData() {
  try {
    const [recordings, posts, author, siteSettings] = await Promise.all([
      client.fetch(recordingsQuery),
      client.fetch(postsQuery + "[0...3]"), // Get only 3 most recent posts
      client.fetch(authorQuery),
      client.fetch(siteSettingsQuery),
    ]);

    return {
      featuredRecordings: recordings
        .filter((r: Recording) => r.featured)
        .slice(0, 3),
      recentPosts: posts,
      author,
      siteSettings,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      featuredRecordings: [],
      recentPosts: [],
      author: null,
      siteSettings: null,
    };
  }
}

export default async function Home() {
  const { featuredRecordings, recentPosts, author, siteSettings } =
    await getHomePageData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-24 sm:py-32 animate-fade-in">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in-up">
              <span className="gradient-text">
                {author?.name || "Ken Luk"}
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {author?.title || "Classical Guitarist. Mandolinist."}
            </p>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {siteSettings?.homepageSubtitle ||
                "Exploring the intersection of classical tradition and contemporary expression through strings."}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/recordings"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-300 hover-lift"
              >
                Explore Recordings
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-foreground flex items-center gap-2 hover:gap-3 transition-all duration-300 hover:text-primary"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recordings */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Disc className="h-8 w-8" />
              Latest Recordings
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRecordings.map((recording: Recording, index: number) => (
                <div
                  key={recording._id}
                  className="group relative bg-muted rounded-lg p-6 hover:bg-accent transition-all duration-300 hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        recording.isUpcoming
                          ? "bg-warning/10 text-warning border border-warning/20"
                          : "bg-success/10 text-success border border-success/20"
                      }`}
                    >
                      {recording.isUpcoming ? "Upcoming" : "Recent"}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {recording.artist} – {recording.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {new Date(recording.releaseDate).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/recordings"
                className="text-sm font-semibold text-foreground hover:text-muted-foreground flex items-center justify-center gap-2"
              >
                View all recordings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Music className="h-8 w-8" />
              Recent Thoughts
            </h2>
            <div className="mt-8 space-y-8">
              {recentPosts.map((post: Post, index: number) => (
                <article key={post._id} className="relative group animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    <Link href={`/blog/${post.slug.current}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="text-sm font-semibold text-foreground hover:text-muted-foreground flex items-center justify-center gap-2"
              >
                Read all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-card animate-fade-in">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Let's Connect
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're interested in performances, collaborations, or just
              want to say hello.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-300 hover-lift"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
