import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/app/themeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const inter = Inter({ subsets: ['latin'] })

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
    /*<html lang="en">
      <body className={inter.className}>{children}</body>
    </html>*/
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0d1117]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
