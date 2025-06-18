import Image from 'next/image'
import Link from 'next/link'

export default function SectionLandingPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Sticky Global Nav - This can be moved to a shared layout component later */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm px-4 py-3 flex justify-between items-center md:px-8">
        <div className="text-lg font-bold text-blue-800">MSP Growth Hub</div>
        <nav className="hidden md:flex space-x-4 text-sm text-gray-700">
          <Link href="/sales" className="hover:text-blue-600">Sales</Link>
          <Link href="/marketing" className="hover:text-blue-600">Marketing</Link>
          <Link href="/operations" className="hover:text-blue-600">Operations</Link>
          <Link href="/success" className="hover:text-blue-600">Customer Success</Link>
          <Link href="/product" className="hover:text-blue-600">Product</Link>
          <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Using a placeholder image for now */}
          <div className="rounded shadow-md w-full max-w-md relative aspect-video">
            <Image 
              src="https://via.placeholder.com/400x225" 
              alt="Module Cover"
              fill
              className="rounded object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Sales Process Designer™</h1>
            <p className="text-white/90 mb-4 text-sm">
              Learn to map out complex sales processes through clear stages like qualification,
              discovery, evaluation, and negotiation. This module gives you the frameworks, tools,
              and mindset to turn chaos into clarity.
            </p>
            <div className="flex items-center space-x-4 text-sm mb-4">
              <span className="bg-white text-blue-800 px-3 py-1 rounded-full font-semibold">28% complete</span>
              <span className="text-blue-100">3 files</span>
              <span className="text-blue-100">2 hrs 21 mins</span>
            </div>
            <Link 
              href="/lesson/sales-process-designer" 
              className="inline-block bg-white text-blue-800 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition"
            >
              ▶ Play
            </Link>
          </div>
        </div>
      </section>

      {/* Video List */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Lessons in This Section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Video Card 1 */}
          <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition">
            <div className="w-full h-36 relative">
              <Image 
                src="https://via.placeholder.com/600x300" 
                alt="Sales Process Designer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-sm">Sales Process Designer™</h4>
              <p className="text-xs text-gray-500">Intro module</p>
            </div>
          </div>
          
          {/* Video Card 2 */}
          <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition">
            <div className="w-full h-36 relative">
              <Image 
                src="https://via.placeholder.com/600x300" 
                alt="Sales Motion Designer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-sm">Sales Motion Designer™</h4>
              <p className="text-xs text-gray-500">with Marcel Petitpas</p>
            </div>
          </div>
          
          {/* Video Card 3 */}
          <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden transition">
            <div className="w-full h-36 relative">
              <Image 
                src="https://via.placeholder.com/600x300" 
                alt="Sales Velocity"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-sm">Sales Velocity™</h4>
              <p className="text-xs text-gray-500">Coaching Call with Dan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
