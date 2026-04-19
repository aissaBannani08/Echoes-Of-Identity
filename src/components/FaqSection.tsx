"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    { question: "What is Echoes of Identity?", answer: "Echoes of Identity is a youth-led initiative aimed at preserving the human stories of Jewish and Muslim communities worldwide through personal interviews." },
    { question: "How do I submit a testimony?", answer: "You can submit a testimony by clicking 'Get Involved' and following our submission guidelines, or by being interviewed by one of our chapters." },
    { question: "How do I start a chapter?", answer: "Starting a chapter involves finding local interviewees and recording their stories using our framework. Reach out via our Contact page to get the starter kit." },
  ];

  return (
    <section className="w-full bg-midnight py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-cormorant text-4xl md:text-5xl text-center text-[#F5EFE0] mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 bg-white/[0.02] overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-center justify-between font-inter text-parchment hover:text-gold transition-colors"
      >
        <span className="font-medium text-lg">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 font-inter text-parchment/60 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
