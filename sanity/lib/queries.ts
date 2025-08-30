import { groq } from 'next-sanity'

export const authorQuery = groq`
  *[_type == "author" && _id == "ken-luk"][0] {
    _id,
    name,
    title,
    bio,
    email,
    instagram,
    youtube,
    image
  }
`

export const recordingsQuery = groq`
  *[_type == "recording"] | order(order asc) {
    _id,
    title,
    artist,
    releaseDate,
    description,
    bandcampUrl,
    spotifyUrl,
    appleMusicUrl,
    youtubeUrl,
    isUpcoming,
    featured,
    coverImage
  }
`

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "site-settings"][0] {
    _id,
    title,
    description,
    keywords,
    author->{
      name,
      email,
      instagram,
      youtube
    },
    mainNavigation,
    socialLinks
  }
`