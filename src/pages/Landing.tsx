import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6F61] text-white shadow-lg shadow-orange-500/20">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">SciQuest</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link 
              to="/app" 
              className="rounded-full bg-[#00BFFF] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:bg-blue-400 hover:shadow-blue-500/40 active:scale-95"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#FFD700]/20 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-[#FF6F61]/10 blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 shadow-sm border border-slate-200">
              <Sparkles className="h-4 w-4 text-[#FFD700]" />
              <span className="text-sm font-semibold text-slate-700">New: Space Exploration Module</span>
            </div>
            <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
              Ignite Curiosity, <br />
              <span className="bg-gradient-to-r from-[#FF6F61] to-[#FFD700] bg-clip-text text-transparent">
                Explore Science!
              </span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-600 sm:px-12">
              SciQuest is the interactive playground where kids aged 6-14 discover the wonders of the universe. Virtual labs, 3D experiments, and endless fun await.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/app"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#FF6F61] px-8 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/50 sm:w-auto"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="flex h-14 w-full items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Virtual Labs",
                desc: "Conduct safe, exciting experiments right from your browser.",
                icon: <Zap className="h-8 w-8 text-white" />,
                color: "bg-[#FF6F61]"
              },
              {
                title: "Global Topics",
                desc: "From volcanoes to black holes, explore every corner of science.",
                icon: <Globe className="h-8 w-8 text-white" />,
                color: "bg-[#00BFFF]"
              },
              {
                title: "Earn Rewards",
                desc: "Level up your scientist rank and collect badges as you learn.",
                icon: <Sparkles className="h-8 w-8 text-white" />,
                color: "bg-[#FFD700]"
              }
            ].map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-lg leading-relaxed text-slate-600">{feature.desc}</p>
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${feature.color} opacity-10 blur-2xl transition-all group-hover:scale-150 group-hover:opacity-20`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
