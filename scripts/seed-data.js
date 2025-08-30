require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const categories = [
  {
    _type: 'category',
    _id: 'back-in-the-day',
    title: 'Back in the Day',
    slug: { current: 'back-in-the-day' },
    description: 'Memories and stories from the past'
  },
  {
    _type: 'category',
    _id: 'classical-guitar',
    title: 'Classical Guitar',
    slug: { current: 'classical-guitar' },
    description: 'Posts about classical guitar music and technique'
  },
  {
    _type: 'category',
    _id: 'classical-guitar-vinyls',
    title: 'Classical Guitar Vinyls',
    slug: { current: 'classical-guitar-vinyls' },
    description: 'Vinyl records of classical guitar music'
  },
  {
    _type: 'category',
    _id: 'funny-vinyls',
    title: 'Funny Vinyls',
    slug: { current: 'funny-vinyls' },
    description: 'Amusing and quirky vinyl records'
  },
  {
    _type: 'category',
    _id: 'how-it-all-started',
    title: 'How it all started',
    slug: { current: 'how-it-all-started' },
    description: 'Origin stories and beginnings'
  },
  {
    _type: 'category',
    _id: 'mandolin',
    title: 'Mandolin',
    slug: { current: 'mandolin' },
    description: 'Posts about mandolin music and performance'
  },
  {
    _type: 'category',
    _id: 'reggae',
    title: 'Reggae',
    slug: { current: 'reggae' },
    description: 'Reggae music and culture'
  },
  {
    _type: 'category',
    _id: 'rochester-ny',
    title: 'Rochester, NY',
    slug: { current: 'rochester-ny' },
    description: 'Stories and experiences from Rochester, NY'
  },
  {
    _type: 'category',
    _id: 'uncategorized',
    title: 'Uncategorized',
    slug: { current: 'uncategorized' },
    description: 'Miscellaneous posts'
  },
  {
    _type: 'category',
    _id: 'vinyls',
    title: 'Vinyls',
    slug: { current: 'vinyls' },
    description: 'Vinyl record collection and stories'
  }
]

const author = {
  _type: 'author',
  _id: 'ken-luk',
  name: 'Ken Luk',
  slug: { current: 'ken-luk' },
  title: 'Classical Guitarist. Mandolinist.',
  bio: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Ken Luk is a classical guitarist, mandolinist, teacher, and arranger. He holds a Doctor of Musical Arts from Eastman School of Music and a Master of Art in Music Theory Pedagogy from Eastman, where he studied with Dr. Nicholas Goluses.'
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Born and raised in Hong Kong, Ken is co-founder of Rochester Classical Guitar and Rochester Mandolin Orchestra, and serves on the board of the Classical Mandolin Society of America. He is a member of several musical groups including Janus Duo, Trio Ghidorah, and fivebyfive (as electric guitarist).'
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Ken teaches guitar and mandolin at Alfred University and SUNY Geneseo, and also teaches Balinese Gamelan at Eastman Community Music School and SUNY Fredonia. His musical interests span classical, Brazilian, Indonesian, Jamaican, and Zimbabwean music.'
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'He was a finalist in the Roland Dyens Arranging International Competition in 2017 and has performed with various ensembles at festivals and venues around the world.'
        }
      ]
    }
  ],
  email: 'kenlukmusic@gmail.com',
  instagram: 'guitarfluke',
  youtube: 'UC6H1C9G2WEWwo1yE53Xg0iA',
}

const recordings = [
  {
    _type: 'recording',
    _id: 'janus-issus-2025',
    title: 'Issus',
    artist: 'Janus Guitar Duo',
    releaseDate: '2025-01-01',
    isUpcoming: true,
    featured: true,
    order: 1
  },
  {
    _type: 'recording', 
    _id: 'fivebyfive-sonidos-2025',
    title: 'Sonidos de Tlön',
    artist: 'fivebyfive',
    releaseDate: '2025-01-01',
    isUpcoming: true,
    featured: true,
    order: 2
  },
  {
    _type: 'recording',
    _id: 'fivebyfive-eclipse-2024',
    title: 'Eclipse',
    artist: 'fivebyfive',
    releaseDate: '2024-01-01',
    featured: true,
    order: 3
  },
  {
    _type: 'recording',
    _id: 'fivebyfive-breath-fire-2023',
    title: 'Breath and Fire',
    artist: 'fivebyfive',
    releaseDate: '2023-01-01',
    order: 4
  },
  {
    _type: 'recording',
    _id: 'fivebyfive-play-album-2023',
    title: 'Play Album',
    artist: 'fivebyfive',
    releaseDate: '2023-01-01',
    order: 5
  },
  {
    _type: 'recording',
    _id: 'amor-imperfeito-2022',
    title: 'Amor Imperfeito',
    artist: 'Mauro Marcondes and Zéjorge, Rosa Boemia',
    releaseDate: '2022-01-01',
    order: 6
  },
  {
    _type: 'recording',
    _id: 'francisco-2022',
    title: 'Francisco',
    artist: 'Mauro Marcondes and Rosa Boemia',
    releaseDate: '2022-01-01',
    order: 7
  },
  {
    _type: 'recording',
    _id: 'unity-is-dub-2021',
    title: 'Unity is Dub',
    artist: 'Mosaic Foundation',
    releaseDate: '2021-01-01',
    order: 8
  },
  {
    _type: 'recording',
    _id: 'dances-fantasies-2021',
    title: 'Dances and Fantasies',
    artist: 'Trio Ghidorah',
    releaseDate: '2021-01-01',
    order: 9
  },
  {
    _type: 'recording',
    _id: 'christmas-time-2020',
    title: 'Christmas Time is Here',
    artist: 'Janus Duo',
    releaseDate: '2020-01-01',
    order: 10
  },
  {
    _type: 'recording',
    _id: 'passages-2020',
    title: 'Passages',
    artist: 'Janus Duo',
    releaseDate: '2020-01-01',
    order: 11
  },
  {
    _type: 'recording',
    _id: 'unity-is-strength-2018',
    title: 'Unity is Strength',
    artist: 'Mosaic Foundation',
    releaseDate: '2018-01-01',
    bandcampUrl: 'https://mosaicfoundation.bandcamp.com/album/unity-is-strength',
    order: 12
  },
  {
    _type: 'recording',
    _id: 'reuptake-2014',
    title: 'Reuptake',
    artist: 'Neuroceptor',
    releaseDate: '2014-01-01',
    bandcampUrl: 'https://neuroceptor.bandcamp.com/album/reuptake',
    order: 13
  },
  {
    _type: 'recording',
    _id: 'signs-of-time-2013',
    title: 'Signs of the Time',
    artist: 'Mosaic Foundation',
    releaseDate: '2013-01-01',
    order: 14
  },
  {
    _type: 'recording',
    _id: 'neuroceptor-2012',
    title: 'Neuroceptor',
    artist: 'Neuroceptor',
    releaseDate: '2012-01-01',
    order: 15
  },
  {
    _type: 'recording',
    _id: 'do-right-2012',
    title: 'Do Right',
    artist: 'Mosaic Foundation',
    releaseDate: '2012-01-01',
    bandcampUrl: 'https://mosaicfoundation.bandcamp.com/album/do-right',
    order: 16
  },
  {
    _type: 'recording',
    _id: 'mosaic-foundation-2011',
    title: 'Mosaic Foundation',
    artist: 'Mosaic Foundation',
    releaseDate: '2011-01-01',
    order: 17
  }
]

const posts = [
  {
    _type: 'post',
    _id: 'post-61-nsl',
    title: '#61 NSL',
    slug: { current: '61-nsl' },
    author: { _type: 'reference', _ref: 'ken-luk' },
    publishedAt: '2023-04-08T00:00:00Z',
    excerpt: 'Working at Sibley Music Library - a note left by a former student worker',
    categories: [
      { _type: 'reference', _ref: 'classical-guitar' },
      { _type: 'reference', _ref: 'rochester-ny' }
    ],
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Working at Sibley Music Library, I discovered a note left by a former student worker...'
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-60-sweet-d-flat',
    title: '#60 Sweet D-Flat',
    slug: { current: '60-sweet-d-flat' },
    author: { _type: 'reference', _ref: 'ken-luk' },
    publishedAt: '2022-10-17T00:00:00Z',
    excerpt: 'Discusses musical key associations and reflects on "sweet" music and favorite pieces',
    categories: [
      { _type: 'reference', _ref: 'classical-guitar' },
      { _type: 'reference', _ref: 'how-it-all-started' }
    ],
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The key of D-flat major has always held a special place in my musical heart...'
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-59-chorei',
    title: '#59 Chorei',
    slug: { current: '59-chorei' },
    author: { _type: 'reference', _ref: 'ken-luk' },
    publishedAt: '2022-05-07T00:00:00Z',
    excerpt: 'Personal narrative about bike riding and experiencing unexpected emotions',
    categories: [
      { _type: 'reference', _ref: 'uncategorized' }
    ],
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'During a bike ride, I found myself overcome with unexpected emotions...'
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-58-ernest-shand',
    title: '#58 Ernest Shand',
    slug: { current: '58-ernest-shand' },
    author: { _type: 'reference', _ref: 'ken-luk' },
    publishedAt: '2022-03-15T00:00:00Z',
    excerpt: 'Reflections on musical influences and mentorship',
    categories: [
      { _type: 'reference', _ref: 'classical-guitar' },
      { _type: 'reference', _ref: 'back-in-the-day' }
    ],
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ernest Shand was more than just a musician - he was a mentor who shaped my understanding...'
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-57-the-lick',
    title: '#57 The Lick',
    slug: { current: '57-the-lick' },
    author: { _type: 'reference', _ref: 'ken-luk' },
    publishedAt: '2022-01-20T00:00:00Z',
    excerpt: 'Exploring the famous jazz lick and its appearances across genres',
    categories: [
      { _type: 'reference', _ref: 'classical-guitar' },
      { _type: 'reference', _ref: 'how-it-all-started' }
    ],
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'There\'s a particular jazz lick that seems to appear everywhere in music...'
          }
        ]
      }
    ]
  }
]

const siteSettings = {
  _type: 'siteSettings',
  _id: 'site-settings',
  title: 'Ken Luk Music',
  description: 'Classical Guitarist and Mandolinist - Exploring musical traditions and contemporary expression',
  keywords: ['Ken Luk', 'classical guitar', 'mandolin', 'musician', 'recordings', 'performances'],
  author: { _type: 'reference', _ref: 'ken-luk' },
  mainNavigation: [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Recordings', link: '/recordings' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' }
  ],
  socialLinks: {
    instagram: 'https://www.instagram.com/guitarfluke',
    youtube: 'https://www.youtube.com/channel/UC6H1C9G2WEWwo1yE53Xg0iA',
    email: 'kenlukmusic@gmail.com'
  }
}

async function seedData() {
  try {
    console.log('Starting data migration...')
    
    // Create categories first
    console.log('Creating categories...')
    for (const category of categories) {
      await client.createOrReplace(category)
    }
    
    // Create author
    console.log('Creating author...')
    await client.createOrReplace(author)
    
    // Create recordings
    console.log('Creating recordings...')
    for (const recording of recordings) {
      await client.createOrReplace(recording)
    }
    
    // Create posts
    console.log('Creating posts...')
    for (const post of posts) {
      await client.createOrReplace(post)
    }
    
    // Create site settings
    console.log('Creating site settings...')
    await client.createOrReplace(siteSettings)
    
    console.log('Data migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
  }
}

seedData()