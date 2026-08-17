import { useTheme } from '../context/ThemeContext'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`tap flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
        isDark
          ? 'border-[#d4af37]/35 bg-[#181510]/90 text-[#e7c960] hover:border-[#e7c960] hover:bg-[#d4af37]/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.35)]'
          : 'border-[#a86d0a]/35 bg-white/90 text-[#a86d0a] hover:border-[#a86d0a] hover:bg-[#f2eee6] hover:shadow-[0_0_15px_rgba(168,109,10,0.25)]'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? (
          <svg
            className="h-4 w-4 transition-transform duration-500 hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 transition-transform duration-500 -rotate-12 hover:rotate-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </span>
    </button>
  )
}
