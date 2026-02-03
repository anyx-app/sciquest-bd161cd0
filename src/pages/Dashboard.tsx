import React from 'react';
import { Beaker, Star, Trophy, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8 p-6 md:p-10 pb-24">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF6F61] to-[#FFD700] p-8 md:p-12 shadow-lg shadow-orange-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-yellow-300/30 blur-2xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span>Daily Streak: 3 Days!</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight">
            Ready to Explore, <br/> Junior Scientist?
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Your lab coat is waiting! Dive into today's featured experiment and unlock new badges.
          </p>
          <Link 
            to="/app/experiments"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#FF6F61] transition-transform hover:scale-105 hover:bg-slate-50 shadow-xl"
          >
            Start Experimenting <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total XP</p>
            <h3 className="text-2xl font-bold text-slate-800">1,250 XP</h3>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <Beaker className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Experiments</p>
            <h3 className="text-2xl font-bold text-slate-800">12 Completed</h3>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex items-center gap-4 bg-gradient-to-br from-green-50 to-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Journal Entries</p>
            <h3 className="text-2xl font-bold text-slate-800">8 Notes</h3>
          </div>
        </GlassCard>
      </div>

      {/* Featured Content */}
      <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">Recommended for You</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <GlassCard className="group flex flex-col h-full">
          <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
             <div className="absolute bottom-4 left-4 z-20">
               <span className="px-2 py-1 text-xs font-bold text-white bg-[#00BFFF] rounded-md mb-2 inline-block">Chemistry</span>
               <h3 className="text-xl font-bold text-white">Volcano Builder</h3>
             </div>
             {/* Placeholder for image */}
             <div className="w-full h-full bg-gradient-to-br from-[#FF6F61] to-[#FFD700] opacity-80" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-slate-600 mb-4 line-clamp-2">
              Create your own volcanic eruption simulation and learn about chemical reactions!
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                150 XP
              </span>
              <button className="text-[#00BFFF] font-bold text-sm hover:underline">Start Now &rarr;</button>
            </div>
          </div>
        </GlassCard>

        {/* Card 2 */}
        <GlassCard className="group flex flex-col h-full">
          <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
             <div className="absolute bottom-4 left-4 z-20">
               <span className="px-2 py-1 text-xs font-bold text-white bg-purple-500 rounded-md mb-2 inline-block">Physics</span>
               <h3 className="text-xl font-bold text-white">Gravity Lab</h3>
             </div>
             <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 opacity-80" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-slate-600 mb-4 line-clamp-2">
              Drop objects on different planets to see how gravity affects their fall speed.
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                200 XP
              </span>
              <button className="text-[#00BFFF] font-bold text-sm hover:underline">Start Now &rarr;</button>
            </div>
          </div>
        </GlassCard>

        {/* Card 3 */}
        <GlassCard className="group flex flex-col h-full">
          <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
             <div className="absolute bottom-4 left-4 z-20">
               <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-md mb-2 inline-block">Biology</span>
               <h3 className="text-xl font-bold text-white">Plant Life Cycle</h3>
             </div>
             <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 opacity-80" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-slate-600 mb-4 line-clamp-2">
              Watch a seed grow into a flower and learn about photosynthesis.
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm font-medium text-slate-500">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                120 XP
              </span>
              <button className="text-[#00BFFF] font-bold text-sm hover:underline">Start Now &rarr;</button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
