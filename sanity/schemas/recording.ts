import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recording',
  title: 'Recording',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album/Recording Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist/Band',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Album Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'bandcampUrl',
      title: 'Bandcamp URL',
      type: 'url',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Is Upcoming Release?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Recording',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist',
      media: 'coverImage',
      year: 'releaseDate',
    },
    prepare(selection) {
      const {subtitle, year} = selection
      const yearStr = year ? new Date(year).getFullYear() : ''
      return {
        ...selection,
        subtitle: `${subtitle} ${yearStr ? `(${yearStr})` : ''}`,
      }
    },
  },
})