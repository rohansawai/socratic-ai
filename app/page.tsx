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
            {/* Animated Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-300">AI Agent-Powered Assessment</span>
            </div>
            
            <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl mb-8">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Evaluate Candidates
              </span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
                Beyond Surface-Level
              </span>
            </h1>
            
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
              Socratic AI leverages advanced LLM orchestration and intelligent AI agents to create dynamic assessment experiences. 
              Our agents introduce reasoning traps and strategic misinformation to reveal true critical thinking abilities through contextual learning.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10">Try Demo</span>
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
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI agent-powered assessment reveals true candidate capabilities through intelligent interaction design and strategic testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Intelligent AI Agents</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Candidates interact with our advanced AI agents that use contextual reasoning and strategic misinformation to test critical thinking abilities through dynamic conversations.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">LLM Orchestration</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Every interaction is orchestrated through advanced LLM systems, logged and analyzed to generate comprehensive reports on problem-solving approach and cognitive patterns.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Contextual Intelligence</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Reveal how effectively candidates navigate ambiguity, challenge incorrect information, and demonstrate real problem-solving ability through contextual learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div id="demo" className="relative z-10 py-24 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how our AI agent assesses critical thinking through a real microservices debugging scenario
            </p>
          </div>

          {/* Demo Challenge Card */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">💼 Demo Challenge: Diagnose Latency in Microservices</h3>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                <strong>Scenario:</strong> Your team is receiving complaints of high API latency from users. You're working on a distributed system with:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-semibold">React Frontend</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-green-400 font-semibold">API Gateway</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-semibold">Service A (Auth)</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-yellow-400 font-semibold">Service B (User Data)</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-pink-400 font-semibold">Service C (Analytics)</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-red-400 font-semibold">Redis Cache</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-indigo-400 font-semibold">PostgreSQL DB</div>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                <strong>Problem:</strong> Users report that even cached endpoints are sometimes slow. Walk us through how you'd identify and resolve the issue.
              </p>
            </div>
          </div>

          {/* Interactive Chat Demo */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-800/50 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full mr-4"></div>
                <span className="text-gray-300 font-medium">Socratic AI Agent - Assessment Session</span>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Step 1 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-300 mb-2">
                      <span className="text-blue-400 font-semibold">Step 1 - Entry Reasoning:</span> Let's start with obvious suspects. If the endpoint is cached and still slow, that clearly rules out the database, right?
                    </p>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                      <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Trap: Premature elimination of DB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">Candidate Response:</span> Not necessarily. If cache misses are happening or data in Redis is stale, the request might still hit the DB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-300 mb-2">
                      <span className="text-blue-400 font-semibold">Step 2 - System-Level Debugging:</span> Fair. But assuming cache hits, could it be a frontend rendering issue?
                    </p>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                      <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Trap: Diverts to non-bottleneck layer
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">Candidate Response:</span> If the API latency itself is high even before rendering, frontend rendering wouldn't be the main problem. I'd want to trace the request at the API Gateway level.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-300 mb-2">
                      <span className="text-blue-400 font-semibold">Step 3 - Introducing Misinformation:</span> Makes sense. One of our interns mentioned that analytics writes in Service C could be causing the slowdown. Should we optimize that first?
                    </p>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-3">
                      <div className="flex items-center text-red-400 text-sm font-medium mb-1">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Trap: Service C is async and shouldn't affect API latency
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">Candidate Response:</span> Since analytics is asynchronous, it shouldn't block the response path. I'd confirm that it's properly decoupled — maybe a queue like Kafka is delayed, but that shouldn't delay API responses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-semibold">Step 4 - Insightful Suggestion:</span> If not the DB or analytics, what would you look at next?
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">R</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-gray-300">
                      <span className="text-green-400 font-semibold">Candidate Response:</span> I'd instrument distributed tracing with something like OpenTelemetry or Zipkin to find which service is causing the latency. Also check Redis hit/miss ratio, API Gateway load, and network latency between services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Report */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 mr-4">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">📊 AI Assessment Report</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">🧠 What This Reveals</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Candidate challenges misleading assumptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thinks system-wide and considers architecture</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prioritizes instrumentation over guessing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Demonstrates deep systems intuition</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">📝 Final Verdict</h4>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400 font-semibold">Strong Systems Thinker</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Demonstrated deep understanding of latency root-cause analysis, handled traps with clarity, and maintained architectural perspective throughout the assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/chat" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Try the Full Assessment
            </Link>
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
