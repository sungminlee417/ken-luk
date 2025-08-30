'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Instagram, Youtube, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    const mailtoLink = `mailto:kenlukmusic@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Don't hesitate to reach out for performances, lessons, collaborations, or just to say hello.
          </p>

          {/* Contact Information */}
          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <Link
                  href="mailto:kenlukmusic@gmail.com"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  kenlukmusic@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Instagram className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Instagram</p>
                <Link
                  href="https://www.instagram.com/guitarfluke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  @guitarfluke
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Youtube className="h-6 w-6 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">YouTube</p>
                <Link
                  href="https://www.youtube.com/channel/UC6H1C9G2WEWwo1yE53Xg0iA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ken Luk Music
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="Performance Inquiry">Performance Inquiry</option>
                  <option value="Lesson Request">Lesson Request</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-16 rounded-lg bg-gray-50 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              For performance bookings, please include:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Event date and location</li>
              <li>Type of event</li>
              <li>Performance duration</li>
              <li>Technical requirements</li>
              <li>Budget range (if applicable)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}