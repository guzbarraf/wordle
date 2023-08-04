import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50 dark:bg-slate-900">
      <div>
        <ThemeSwitcher/>
      </div>
      <div className={'text-black dark:invert'}>QWERTY</div>
    </main>
  )
}



