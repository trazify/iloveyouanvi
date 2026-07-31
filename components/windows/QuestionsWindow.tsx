'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '@/lib/constants';

interface QuestionsWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function QuestionsWindow({ addLove, unlockAchievement }: QuestionsWindowProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const reveal = () => {
    if (!showAnswer) {
      setShowAnswer(true);
      setAnsweredCount(prev => {
        const next = prev + 1;
        if (next >= QUESTIONS.length) {
          unlockAchievement('teaser');
        }
        return next;
      });
      addLove(2);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setShowAnswer(false);
      setCurrentQ(prev => prev + 1);
    }
  };

  const question = QUESTIONS[currentQ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-loveos-cream to-loveos-bg">
      {/* Question counter */}
      <div className="text-[7px] text-loveos-muted mb-4">
        Question {currentQ + 1} of {QUESTIONS.length}
      </div>

      {/* Card */}
      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="pixel-btn bg-white p-6 max-w-[340px] w-full text-center"
      >
        {/* Question */}
        <div className="text-3xl mb-3">{question.emoji}</div>
        <p className="font-[family-name:var(--font-hand)] text-xl text-loveos-dark mb-4">
          {question.question}
        </p>

        {/* Answer */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t-2 border-loveos-pink/30 pt-4"
            >
              <p className="font-[family-name:var(--font-hand)] text-lg text-loveos-accent">
                {question.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        {!showAnswer ? (
          <button
            onClick={reveal}
            className="pixel-btn bg-loveos-accent text-white text-[8px] px-4 py-2"
          >
            Reveal Answer ❤️
          </button>
        ) : currentQ < QUESTIONS.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="pixel-btn bg-loveos-pink text-loveos-dark text-[8px] px-4 py-2"
          >
            Next Question →
          </button>
        ) : (
          <div className="text-[9px] text-loveos-accent font-[family-name:var(--font-hand)] text-lg">
            You answered them all! 🎉
          </div>
        )}
      </div>
    </div>
  );
}
