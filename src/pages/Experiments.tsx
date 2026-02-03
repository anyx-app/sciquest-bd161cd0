import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/recipes/effects/SpotlightCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const VolcanoExperiment = () => {
  const [intensity, setIntensity] = useState([50]);
  
  // Generate particles based on intensity
  const particles = Array.from({ length: Math.floor(intensity[0] / 2) }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // Random spread
    y: -Math.random() * 200 - 50, // Upward movement
    duration: Math.random() * 1 + 0.5,
    delay: Math.random() * 2
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Eruption Intensity</h3>
        <span className="text-sm font-bold text-orange-500">{intensity[0]}%</span>
      </div>
      <Slider 
        value={intensity} 
        onValueChange={setIntensity} 
        max={100} 
        step={1}
        className="w-full"
      />
      
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-slate-900/50 flex items-end justify-center pb-10">
        {/* Volcano Base */}
        <div className="relative z-10 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-stone-700"></div>
        
        {/* Lava Stream */}
        <motion.div 
          className="absolute bottom-[110px] w-4 h-full bg-gradient-to-t from-orange-600 to-red-500 blur-sm"
          animate={{ height: [0, intensity[0] * 2] }}
          transition={{ duration: 0.5 }}
        />

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bottom-[110px] w-2 h-2 rounded-full bg-orange-400"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ 
              opacity: [1, 0],
              x: p.x,
              y: p.y,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SolarSystemExperiment = () => {
  const [speed, setSpeed] = useState([1]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Orbit Speed</h3>
        <span className="text-sm font-bold text-blue-400">{speed[0]}x</span>
      </div>
      <Slider 
        value={speed} 
        onValueChange={setSpeed} 
        min={0.1}
        max={5} 
        step={0.1}
        className="w-full"
      />
      
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
        {/* Stars Background */}
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Sun */}
        <div className="absolute w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.6)] z-10"></div>
        
        {/* Earth Orbit */}
        <motion.div 
          className="absolute w-[200px] h-[200px] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 10 / speed[0], repeat: Infinity, ease: "linear" }}
        >
          {/* Earth */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </motion.div>

        {/* Mars Orbit */}
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 15 / speed[0], repeat: Infinity, ease: "linear" }}
        >
          {/* Mars */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        </motion.div>
      </div>
    </div>
  );
};

const Experiments = () => {
  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Virtual Science Lab</h1>
        <p className="text-muted-foreground">Interactive simulations to explore the wonders of science.</p>
      </div>

      <Tabs defaultValue="volcano" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="volcano">Volcano</TabsTrigger>
          <TabsTrigger value="solar">Solar System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="volcano" className="mt-6">
          <SpotlightCard className="bg-card/50 backdrop-blur-sm" spotlightColor="249, 115, 22">
            <CardHeader>
              <CardTitle>Volcanic Eruption</CardTitle>
              <CardDescription>Adjust the pressure to see how volcanoes erupt.</CardDescription>
            </CardHeader>
            <CardContent>
              <VolcanoExperiment />
            </CardContent>
          </SpotlightCard>
        </TabsContent>
        
        <TabsContent value="solar" className="mt-6">
          <GlassCard className="p-0">
            <div className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Solar System Builder</CardTitle>
                <CardDescription>Control the speed of planetary orbits.</CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <SolarSystemExperiment />
              </CardContent>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Experiments;

