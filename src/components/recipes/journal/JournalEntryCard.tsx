import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface JournalEntry {
  id: number;
  title: string;
  date: string;
  snippet: string;
  category: string;
  mood: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md border-slate-200">
      <CardHeader className="bg-slate-50/50 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {entry.category}
          </span>
          <div className="flex items-center text-xs text-slate-500">
            <Calendar className="mr-1 h-3 w-3" />
            {entry.date}
          </div>
        </div>
        <CardTitle className="text-xl text-slate-800 group-hover:text-[#FF6F61] transition-colors">
          {entry.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-slate-600 line-clamp-3">
          {entry.snippet}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">
            Mood: <span className="text-slate-700">{entry.mood}</span>
          </span>
          <Button variant="ghost" size="sm" className="h-8 text-[#00BFFF] hover:text-[#00BFFF]/80 hover:bg-blue-50">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

