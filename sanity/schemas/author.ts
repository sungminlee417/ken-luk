import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g., Classical Guitarist. Mandolinist.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Channel ID',
      type: 'string',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'degree',
            title: 'Degree',
            type: 'string',
          },
          {
            name: 'institution',
            title: 'Institution',
            type: 'string',
          },
          {
            name: 'details',
            title: 'Additional Details',
            type: 'string',
          }
        ]
      }]
    }),
    defineField({
      name: 'organizations',
      title: 'Organizations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'role',
            title: 'Role',
            type: 'string',
          },
          {
            name: 'organization',
            title: 'Organization',
            type: 'string',
          }
        ]
      }]
    }),
    defineField({
      name: 'teachingPositions',
      title: 'Teaching Positions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'subject',
            title: 'Subject',
            type: 'string',
          },
          {
            name: 'institution',
            title: 'Institution',
            type: 'string',
          }
        ]
      }]
    }),
    defineField({
      name: 'musicalGroups',
      title: 'Musical Groups',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'group',
            title: 'Group Name',
            type: 'string',
          },
          {
            name: 'role',
            title: 'Role (optional)',
            type: 'string',
          }
        ]
      }]
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Achievement',
            type: 'string',
          },
          {
            name: 'year',
            title: 'Year',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description (optional)',
            type: 'text',
          }
        ]
      }]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})