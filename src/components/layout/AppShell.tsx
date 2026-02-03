import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Beaker, BookOpen, Trophy, Home, Menu, X, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/app', icon: Home },
    { name: 'Experiments', href: '/app/experiments', icon: Beaker },
    { name: 'My Journal', href: '/app/journal', icon: BookOpen },
    { name: 'Achievements', href: '/app/achievements', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-100">
          <Link to="/app" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6F61] text-white">
              <Beaker className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">SciQuest</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-[#00BFFF]/10 text-[#00BFFF]" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-[#00BFFF]" : "text-slate-400 group-hover:text-slate-600"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#FF6F61] to-[#FFD700] p-4 text-white shadow-lg shadow-orange-500/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <Star className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Current Level</p>
              <p className="font-bold">Junior Scientist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col md:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 backdrop-blur-xl">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 md:flex">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600">Lab Online</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00BFFF] to-blue-600 p-[2px]">
              <div className="h-full w-full rounded-full bg-white p-1">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="h-full w-full rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
