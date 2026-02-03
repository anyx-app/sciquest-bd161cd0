import React from 'react';
import { StatCard } from '@/components/recipes/dashboard/StatCard';
import { SpotlightCard } from '@/components/recipes/effects/SpotlightCard';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Zap, Target, Award, Medal } from 'lucide-react';

export default function Achievements() {
  // Mock Data
  const stats = [
    { 
      title: 'Total Earned', 
      value: '12', 
      icon: Trophy, 
      change: { value: 2, label: 'this week', isPositive: true } 
    },
    { 
      title: 'Current Streak', 
      value: '5 Days', 
      icon: Zap, 
      change: { value: 1, label: 'day increase', isPositive: true } 
    },
    { 
      title: 'Level', 
      value: '7', 
      icon: Star, 
      change: { value: 350, label: 'XP to Level 8', isPositive: true } 
    },
  ];

  const badges = [
    { id: 1, title: 'Science Whiz', description: 'Completed 5 experiments', icon: <Award className="h-8 w-8 text-blue-500" />, earned: true },
    { id: 2, title: 'Quiz Master', description: 'Scored 100% on 3 quizzes', icon: <Target className="h-8 w-8 text-red-500" />, earned: true },
    { id: 3, title: 'Daily Explorer', description: 'Logged in for 7 days straight', icon: <Zap className="h-8 w-8 text-yellow-500" />, earned: false },
    { id: 4, title: 'Lab Rat', description: 'Spent 10 hours in the lab', icon: <Medal className="h-8 w-8 text-green-500" />, earned: true },
    { id: 5, title: 'Curious Mind', description: 'Asked 10 questions to AI', icon: <Star className="h-8 w-8 text-purple-500" />, earned: false },
    { id: 6, title: 'Top Scorer', description: 'Reached top 10 leaderboard', icon: <Trophy className="h-8 w-8 text-gold-500" />, earned: false },
  ];

  const currentLevel = 7;
  const currentXP = 650;
  const nextLevelXP = 1000;
  const progressPercentage = (currentXP / nextLevelXP) * 100;

  return (
    <div className="space-y-8 p-6 md:p-10 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Achievements</h1>
        <p className="text-muted-foreground">Track your progress and view your earned badges.</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Level Progress */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Level {currentLevel} Progress</h3>
            <p className="text-sm text-muted-foreground">{currentXP} / {nextLevelXP} XP</p>
          </div>
          <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
      </div>

      {/* Badges Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Badges Collection</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <SpotlightCard
              key={badge.id}
              className={`flex flex-col items-center text-center p-6 transition-all ${!badge.earned ? 'opacity-60 grayscale' : ''}`}
              spotlightColor="124, 58, 237"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4 ring-1 ring-primary/20">
                {badge.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
              {badge.earned ? (
                <span className="mt-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  Earned
                </span>
              ) : (
                <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  Locked
                </span>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}

