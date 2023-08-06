import './globals.css';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from "@/app/themeProvider";

const font = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: 'WORDLE con Next 13',
  description: 'Creado por Guzbarraf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-slate-50 dark:bg-[#0d1117] flex flex-row min-h-screen justify-center items-center`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
