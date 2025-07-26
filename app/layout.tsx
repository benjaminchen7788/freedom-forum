// app/layout.tsx
export const metadata = {
  title: '共話天涯',
  description: '一個人人可發聲的自由平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body style={{ backgroundColor: '#f0f0f0', margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
