import { PortableText as PortableTextReact } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components = {
  block: {
    normal: ({children}: {children?: React.ReactNode}) => <p className="mb-4">{children}</p>,
    h1: ({children}: {children?: React.ReactNode}) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({children}: {children?: React.ReactNode}) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    h3: ({children}: {children?: React.ReactNode}) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    blockquote: ({children}: {children?: React.ReactNode}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({children}: {children?: React.ReactNode}) => <strong className="font-semibold">{children}</strong>,
    em: ({children}: {children?: React.ReactNode}) => <em className="italic">{children}</em>,
    link: ({children, value}: {children?: React.ReactNode, value?: {href: string}}) => (
      <a 
        href={value?.href} 
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
}

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

export default function PortableText({ value, className = "" }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}