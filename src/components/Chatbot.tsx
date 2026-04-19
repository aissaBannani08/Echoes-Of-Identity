'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello. I am here to explore memory and identity with you. What is on your mind today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error('Failed to get a response from the server.');
      }

      const returnedMessage = await res.json();
      setMessages((prev) => [...prev, returnedMessage]);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {/* Chat Window Popup */}
      {isOpen && (
        <div className="mb-4 flex flex-col h-[65vh] max-h-[600px] w-[90vw] sm:w-[400px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 transition-all duration-300 animate-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-black/60 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-light tracking-wide text-neutral-100">Reflections</h2>
              <p className="text-[13px] text-neutral-400 mt-0.5 font-light">Explore memory and identity</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 mr-[-8px] text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Window */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-neutral-100 text-neutral-900 rounded-tr-md shadow-md'
                      : 'bg-white/5 border border-white/10 text-neutral-200 rounded-tl-md shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed font-light text-[14px]">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-[85%] p-4 rounded-2xl bg-white/5 border border-white/10 text-neutral-200 rounded-tl-sm flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center bg-red-950/50 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mt-4 animate-in fade-in">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-black/60 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex space-x-2 relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your reflection..."
                className="flex-1 p-3 pr-[50px] border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white/5 placeholder-neutral-500 font-light transition-all hover:bg-white/10 text-[14px] outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-neutral-100 text-neutral-900 font-medium rounded-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98] flex items-center justify-center"
                aria-label="Send message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-900 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300 border border-neutral-300"
          aria-label="Open chat widget"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
      
    </div>
  );
}
