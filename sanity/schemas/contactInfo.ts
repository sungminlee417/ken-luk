import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      initialValue: "Don't hesitate to reach out for performances, lessons, collaborations, or just to say hello.",
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Channel Name',
      type: 'string',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Channel URL',
      type: 'url',
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Contact Form Title',
      type: 'string',
      initialValue: 'Send a Message',
    }),
    defineField({
      name: 'formSubjects',
      title: 'Form Subject Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Performance Inquiry',
        'Lesson Request',
        'Collaboration',
        'General Inquiry'
      ],
    }),
    defineField({
      name: 'bookingInfoTitle',
      title: 'Booking Information Title',
      type: 'string',
      initialValue: 'Booking Information',
    }),
    defineField({
      name: 'bookingInfoDescription',
      title: 'Booking Information Description',
      type: 'text',
      initialValue: 'For performance bookings, please include:',
    }),
    defineField({
      name: 'bookingRequirements',
      title: 'Booking Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Event date and location',
        'Type of event',
        'Performance duration',
        'Technical requirements',
        'Budget range (if applicable)'
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'email',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `Email: ${subtitle}` : 'No email set',
      }
    },
  },
})