# Ken Luk Music Website

A modern, responsive website for Ken Luk - Classical Guitarist and Mandolinist, built with Next.js 15 and Sanity CMS.

## Features

- **Modern Design**: Clean, professional layout with responsive design
- **Content Management**: Sanity CMS integration for easy content updates
- **Blog System**: Full-featured blog with categories and archives
- **Recordings Catalog**: Comprehensive discography with upcoming releases
- **Contact Form**: Easy-to-use contact system
- **SEO Optimized**: Built-in SEO best practices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (already configured in `.env.local`)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

### Sanity Studio

Access the Sanity Studio at [http://localhost:3001/studio](http://localhost:3001/studio) to manage content.

## Project Structure

```
ken-luk/
├── src/
│   ├── app/
│   │   ├── (main)/         # Main site pages
│   │   │   ├── about/      # About page
│   │   │   ├── about-site/ # About this site page
│   │   │   ├── blog/       # Blog listing and posts
│   │   │   ├── contact/    # Contact page
│   │   │   ├── recordings/ # Recordings catalog
│   │   │   ├── layout.tsx  # Main site layout
│   │   │   └── page.tsx    # Homepage
│   │   ├── (studio)/       # Studio CMS
│   │   │   ├── studio/     # Sanity Studio
│   │   │   └── layout.tsx  # Studio layout
│   │   ├── layout.tsx      # Root layout
│   │   └── not-found.tsx   # 404 error page
│   └── components/
│       ├── Header.tsx      # Navigation header
│       ├── Footer.tsx      # Site footer
│       ├── ThemeProvider.tsx # Theme context
│       ├── ThemeToggle.tsx # Dark/light mode toggle
│       └── PortableText.tsx # Sanity content renderer
├── sanity/
│   ├── schemas/           # Content schemas
│   └── lib/              # Sanity client config
└── public/               # Static assets
```

## Content Management

### Adding Content

1. Go to `/studio` 
2. Log in with your Sanity account
3. Create and manage:
   - Blog posts
   - Recordings
   - Pages
   - Author information
   - Site settings

### Content Types

- **Posts**: Blog posts with categories, images, and rich text
- **Recordings**: Album information with links to streaming platforms
- **Pages**: Static pages with flexible content
- **Categories**: Blog post categories
- **Author**: Author profile and contact information
- **Site Settings**: Global site configuration

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Update navigation in `Header.tsx`

### Styling

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`.

## Migrated Content

This website modernizes Ken Luk's original WordPress blog with the following improvements:

- **Homepage**: Hero section with featured recordings and recent blog posts
- **About**: Professional biography and musical journey
- **Recordings**: Complete discography with upcoming releases
- **Blog**: All major posts migrated with proper categorization
- **Contact**: Modern contact form with social links

## License

© 2024 Ken Luk Music. All rights reserved.
# ken-luk
