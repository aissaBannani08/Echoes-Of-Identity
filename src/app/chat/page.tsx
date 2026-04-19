import React from 'react';
import Chatbot from '@/components/Chatbot';

export const metadata = {
  title: 'Reflections | Echoes of Identity',
  description: 'A space for exploring identity, memory, and personal reflection.',
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-4 sm:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black">
      <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-1000">
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-neutral-100">
            A Conversation With Time
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto font-light text-base sm:text-lg leading-relaxed">
            This space is designed to help you reflect on your identity and stories. 
            Speak freely.
          </p>
        </div>
        
        <div className="w-full relative">
          <div className="absolute inset-0 bg-stone-800/20 blur-3xl rounded-full scale-105 pointer-events-none"></div>
          <div className="relative">
            <Chatbot />
          </div>
        </div>

      </div>
    </main>
  );
}
