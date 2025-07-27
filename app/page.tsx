import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Socratic AI
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Features</a>
                <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About</a>
                <Link href="/chat" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Demo</Link>
                <a href="https://rohansawai.github.io/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contact</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://rohansawai.github.io/#contact" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8 animate-pulse">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Revolutionary AI Assessment Technology
            </div>
            
            <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl mb-8">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                The AI Agent That
              </span>
              <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mt-2">
                Deliberately Misleads
              </span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2 text-4xl sm:text-5xl md:text-6xl">
                To Reveal Truth
              </span>
            </h1>
            
            {/* Core Value Proposition - Highlighted */}
            <div className="mt-8 mb-8 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-2 border-gray-700/50 max-w-4xl mx-auto">
              <p className="text-2xl font-bold text-white mb-3 leading-relaxed">
                "Our agents introduce 
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> reasoning traps </span>
                and 
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> strategic misinformation </span>
                to reveal true critical thinking abilities through contextual learning."
              </p>
              <p className="text-lg text-gray-300">
                Unlike traditional assessments that test surface-level knowledge, Socratic AI uses advanced LLM orchestration to create intelligent reasoning traps that expose how candidates handle ambiguity, challenge incorrect information, and demonstrate real problem-solving ability.
              </p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                              <Link href="/chat" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10">Experience the Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              
              <a href="https://rohansawai.github.io/#contact" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 border-2 border-gray-600 hover:border-blue-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="flex items-center">
                  Schedule Demo Call
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Key Differentiators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Strategic Misinformation</h3>
                <p className="text-gray-400 text-center text-sm">
                  AI agents deliberately introduce false information to test critical thinking
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Reasoning Traps</h3>
                <p className="text-gray-400 text-center text-sm">
                  Sophisticated cognitive traps reveal true problem-solving abilities
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">Contextual Learning</h3>
                <p className="text-gray-400 text-center text-sm">
                  Dynamic conversations that adapt and evolve based on candidate responses
                </p>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mt-16 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                The Problem with Traditional Hiring
              </h2>
              <p className="text-xl text-gray-300 mb-12 text-center">
                Early-stage startups can't afford bad hires, yet traditional assessments only scratch the surface
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Surface-Level Testing</h3>
                  <p className="text-gray-400 text-center text-base leading-relaxed">
                    Coding challenges only test if candidates can produce correct answers, not how they think through complex problems.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/20">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">No Critical Thinking Assessment</h3>
                  <p className="text-gray-400 text-center text-base leading-relaxed">
                    Traditional interviews fail to evaluate how candidates handle misinformation, ambiguity, and reasoning traps.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Expensive Hiring Mistakes</h3>
                  <p className="text-gray-400 text-center text-base leading-relaxed">
                    Bad hires cost startups 3-5x their annual salary and can derail product development and team dynamics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              The Socratic Method Meets AI
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our revolutionary approach uses <span className="text-red-400 font-semibold">strategic misinformation</span> and <span className="text-orange-400 font-semibold">reasoning traps</span> to reveal true critical thinking abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Strategic Misinformation</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Our AI agents deliberately introduce false information and misleading assumptions to test how candidates challenge incorrect data and navigate ambiguity.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Intelligent Reasoning Traps</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Sophisticated cognitive traps designed to expose surface-level thinking and reveal true problem-solving depth through contextual reasoning challenges.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Contextual Learning</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Dynamic conversations that adapt and evolve, creating personalized reasoning traps that reveal how candidates handle real-world ambiguity and misinformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Socratic AI
              </h3>
              <p className="text-gray-400 max-w-md">
                Transforming hiring through intelligent AI agents and contextual assessment with advanced LLM orchestration.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><Link href="/chat" className="text-gray-300 hover:text-white transition-colors duration-200">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              © 2024 Socratic AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
