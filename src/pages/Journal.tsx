import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JournalEntryCard } from '@/components/recipes/journal/JournalEntryCard';
import { JournalEditor, JournalFormValues } from '@/components/recipes/journal/JournalEditor';
import { toast } from 'sonner';

// Mock data for journal entries
const MOCK_ENTRIES = [
  {
    id: 1,
    title: "Volcano Eruption Experiment",
    date: "2023-10-15",
    snippet: "Today I learned that mixing vinegar and baking soda creates a chemical reaction that releases carbon dioxide gas.",
    category: "Chemistry",
    mood: "Excited"
  },
  {
    id: 2,
    title: "Plant Growth Observation",
    date: "2023-10-12",
    snippet: "Day 3: The bean sprout has grown 2cm taller. It seems to be leaning towards the window.",
    category: "Biology",
    mood: "Curious"
  },
  {
    id: 3,
    title: "Solar System Model",
    date: "2023-10-05",
    snippet: "I built a model of the solar system. Jupiter is huge compared to Earth! The red spot is a giant storm.",
    category: "Astronomy",
    mood: "Proud"
  }
];

export default function Journal() {
  const [entries, setEntries] = useState(MOCK_ENTRIES);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleCreateEntry = (values: JournalFormValues) => {
    const newEntry = {
      id: entries.length + 1,
      title: values.title,
      date: values.date.toISOString().split('T')[0], // Simple date format
      snippet: values.content.length > 100 ? values.content.substring(0, 100) + "..." : values.content,
      category: values.category,
      mood: values.mood
    };
    
    setEntries([newEntry, ...entries]);
    toast.success("Journal entry saved!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Science Journal</h1>
          <p className="mt-2 text-slate-600">Record your observations and discoveries.</p>
        </div>
        <Button 
          onClick={() => setIsEditorOpen(true)}
          className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}

        {/* Empty State / Add New Placeholder */}
        <Card 
          onClick={() => setIsEditorOpen(true)}
          className="flex flex-col items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-[#FF6F61]/50 transition-all cursor-pointer h-full min-h-[200px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm mb-4">
            <Plus className="h-6 w-6 text-[#FF6F61]" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">Add New Discovery</h3>
          <p className="text-sm text-slate-500 mt-1">What did you learn today?</p>
        </Card>
      </div>

      <JournalEditor 
        open={isEditorOpen} 
        onOpenChange={setIsEditorOpen} 
        onSubmit={handleCreateEntry} 
      />
    </div>
  );
}

