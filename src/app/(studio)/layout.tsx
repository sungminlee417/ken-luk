export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ 
      height: '100vh', 
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {children}
    </div>
  )
}