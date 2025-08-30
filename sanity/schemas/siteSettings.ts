import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'homepageSubtitle',
      title: 'Homepage Subtitle',
      type: 'text',
      description: 'The subtitle that appears below the main hero text on the homepage',
      rows: 3,
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'author',
      title: 'Site Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: Rule => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'youtube', title: 'YouTube URL', type: 'url'},
        {name: 'spotify', title: 'Spotify URL', type: 'url'},
        {name: 'bandcamp', title: 'Bandcamp URL', type: 'url'},
        {name: 'email', title: 'Contact Email', type: 'string'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})