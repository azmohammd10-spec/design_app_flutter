export const metadata = {
  title: 'المسوق الذكي AI',
  description: 'تطبيق أتمتة الإعلانات والتمويل بالذكاء الاصطناعي',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  )
}
