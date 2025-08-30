import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About Ken Luk
          </h1>
          
          <div className="mt-8 space-y-8 text-lg text-gray-600">
            <p className="text-xl font-medium text-gray-900">
              Classical Guitarist. Mandolinist. Educator. Explorer of musical traditions.
            </p>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Ken Luk is a versatile musician whose journey spans classical guitar, mandolin, and 
                various musical genres. With a deep foundation in classical music and an adventurous 
                spirit for exploration, Ken brings a unique perspective to every performance and recording.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Musical Journey</h2>
              <p>
                Ken's musical path began with classical guitar, where he developed a profound 
                appreciation for the instrument's expressive capabilities. This foundation led to 
                explorations in mandolin, bringing together classical technique with folk and 
                contemporary influences.
              </p>

              <p>
                Through years of performance and collaboration, Ken has developed a distinctive voice 
                that bridges traditional and contemporary music. His work with various ensembles, 
                including Janus Guitar Duo, fivebyfive, and Mosaic Foundation, showcases his versatility 
                and commitment to musical innovation.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Performance & Recording</h2>
              <p>
                Ken has been featured on numerous recordings spanning classical, jazz, reggae, and 
                experimental music. Notable projects include collaborations with Trio Ghidorah, 
                Neuroceptor, and Rosa Boemia, each highlighting different facets of his musical personality.
              </p>

              <p>
                His performances have taken him to venues across the United States, sharing stages with 
                renowned musicians and bringing classical guitar to diverse audiences. Whether performing 
                solo recitals or with ensembles, Ken brings technical precision and emotional depth to 
                every performance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Teaching & Outreach</h2>
              <p>
                Beyond performance, Ken is dedicated to music education and sharing his passion for 
                classical guitar and mandolin with students of all levels. His teaching approach 
                emphasizes both technical excellence and musical expression, helping students find 
                their own voice through the instrument.
              </p>

              <p>
                Ken has worked at institutions including Sibley Music Library, where he combines his 
                love for music with research and preservation of musical heritage. His blog serves as 
                a platform for sharing insights about music, instruments, and the ongoing journey of 
                musical discovery.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Current Projects</h2>
              <p>
                Ken continues to push boundaries with upcoming releases including "Issus" with Janus 
                Guitar Duo and "Sonidos de Tlön" with fivebyfive. These projects represent his ongoing 
                commitment to creating innovative music that respects tradition while embracing 
                contemporary expression.
              </p>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect</h3>
              <p className="text-gray-600 mb-6">
                For performance inquiries, lessons, or collaborations, please get in touch.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
              >
                Contact Ken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}