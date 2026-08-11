import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { ProductPackScroll } from './components/ProductPackScroll'
import { MetalCalculator } from './components/sections/MetalCalculator'
import { Collections } from './components/sections/Collections'
import { Gallery } from './components/sections/Gallery'
import { CraftSection } from './components/sections/CraftSection'
import { Visit } from './components/sections/Visit'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-clip antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <ProductPackScroll />
          <MetalCalculator />
          <Collections />
          <Gallery />
          <CraftSection />
          <Visit />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
