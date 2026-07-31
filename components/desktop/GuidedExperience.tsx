'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelloKittyIcon, KuromiIcon, SanrioHuggingIcon, CuteCatIllustration } from '@/components/ui/SanrioIcons';
import ThemeLetterNote from '@/components/ui/ThemeLetterNote';
import DiaryWindow from '@/components/windows/DiaryWindow';
import LetterWindow from '@/components/windows/LetterWindow';
import MemoriesWindow from '@/components/windows/MemoriesWindow';
import FlowersWindow from '@/components/windows/FlowersWindow';
import GiftsWindow from '@/components/windows/GiftsWindow';
import AchievementsWindow from '@/components/windows/AchievementsWindow';
import SecretWindow from '@/components/windows/SecretWindow';
import ForeverWindow from '@/components/windows/ForeverWindow';
import { DIARY_ENTRIES, LOVE_LETTERS, ACHIEVEMENTS } from '@/lib/constants';

interface GuidedExperienceProps {
  onCompleteFinale: () => void;
  addLove: (amount?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function GuidedExperience({
  onCompleteFinale,
  addLove,
  unlockAchievement,
}: GuidedExperienceProps) {
  // Step: 0 = Landing, 1 = Hello, 2 = Question, 3 = Reward, 4 = Inventory
  const [step, setStep] = useState(0);
  const [selectedQuestionChoice, setSelectedQuestionChoice] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'flowers' | 'hugs' | 'letter' | 'memories' | 'gifts' | 'achievements' | 'secret' | 'forever' | null>(null);

  // Dodging NO button state
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = useCallback(() => {
    setNoPos({
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 120,
    });
  }, []);

  const handleLaunch = () => {
    setStep(1);
    addLove(10);
    unlockAchievement('smile');
  };

  const handleYes = () => {
    setStep(2);
    addLove(15);
  };

  const handleQuestionAnswer = (choice: string) => {
    setSelectedQuestionChoice(choice);
    addLove(25);
    setStep(3);
  };

  const handleRewardContinue = () => {
    setStep(4);
    addLove(50);
    unlockAchievement('bhonduu');
  };

  return (
    <div className="fixed inset-0 bg-[#FAF5E8] desktop-dots flex flex-col items-center justify-center p-4 select-none z-10">
      
      {/* ─── STEP 0: LANDING PAGE (Screen 1 Screenshot) ─── */}
      {step === 0 && (
        <motion.div
          key="step-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center text-center max-w-lg"
        >
          <h1 className="text-xl md:text-2xl text-[#2B2B2B] font-bold tracking-wider mb-2">
            Happy Girlfriend&apos;s Day
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#8B0000] font-bold mb-8">
            Anvi ❤️
          </h2>

          <motion.div
            className="text-6xl mb-10 cursor-pointer"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={handleLaunch}
          >
            ❤️
          </motion.div>

          <button
            onClick={handleLaunch}
            className="pixel-btn pixel-btn-red text-sm md:text-base px-8 py-3 tracking-widest mb-4 font-bold"
          >
            LOVE.exe
          </button>

          <p className="text-[9px] text-[#665A50] tracking-widest uppercase">
            Click to launch
          </p>
        </motion.div>
      )}

      {/* ─── STEP 1: Hello.exe (Screen 2 Screenshot) ─── */}
      {step === 1 && (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="win98-window w-full max-w-md"
        >
          {/* Title bar */}
          <div className="win98-titlebar">
            <div className="flex items-center gap-2">
              <span className="text-[#8B0000] text-xs">❤</span>
              <span className="text-[#2B2B2B] text-[10px] font-bold">Hello.exe</span>
            </div>
            <div className="flex gap-1">
              <button className="win98-title-btn">□</button>
              <button className="win98-title-btn">□</button>
              <button className="win98-close-btn">✕</button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 flex flex-col items-center text-center">
            {/* Sanrio Hello Kitty & Kuromi Icon */}
            <div className="flex items-center gap-3 mb-6">
              <HelloKittyIcon className="w-16 h-16" />
              <KuromiIcon className="w-16 h-16" />
            </div>

            {/* White Content Box */}
            <div className="content-box w-full mb-6 min-h-[90px] flex items-center justify-center">
              <p className="text-[11px] text-[#2B2B2B] leading-relaxed font-bold">
                Hey Anvi... I made something just for you. Will you explore it with me?
              </p>
            </div>

            {/* Buttons YES / NO */}
            <div className="flex items-center justify-center gap-6 relative w-full">
              <button
                onClick={handleYes}
                className="pixel-btn pixel-btn-red text-xs px-8 py-2.5 min-w-[100px]"
              >
                YES
              </button>

              <motion.button
                className="pixel-btn pixel-btn-blue text-xs px-8 py-2.5 min-w-[100px]"
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
              >
                NO
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── STEP 2: Question.exe (Screen 4 Screenshot) ─── */}
      {step === 2 && (
        <motion.div
          key="step-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="win98-window w-full max-w-md"
        >
          {/* Title bar */}
          <div className="win98-titlebar">
            <div className="flex items-center gap-2">
              <span className="text-[#8B0000] text-xs">❤</span>
              <span className="text-[#2B2B2B] text-[10px] font-bold">Question.exe</span>
            </div>
            <div className="flex gap-1">
              <button className="win98-title-btn">□</button>
              <button className="win98-title-btn">□</button>
              <button className="win98-close-btn">✕</button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 flex flex-col items-center text-center">
            {/* Sanrio Kuromi Icon */}
            <div className="mb-4">
              <KuromiIcon className="w-16 h-16" />
            </div>

            {/* White Question Box */}
            <div className="content-box w-full mb-6 min-h-[80px] flex items-center justify-center">
              <p className="text-[11px] text-[#2B2B2B] leading-relaxed font-bold">
                Do you know how amazing and loved you are?
              </p>
            </div>

            {/* 3 Choice Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => handleQuestionAnswer("NOT REALLY")}
                className="pixel-btn pixel-btn-blue text-xs py-3 w-full text-center font-bold"
              >
                NOT REALLY
              </button>
              <button
                onClick={() => handleQuestionAnswer("MAYBE")}
                className="pixel-btn pixel-btn-blue text-xs py-3 w-full text-center font-bold"
              >
                MAYBE
              </button>
              <button
                onClick={() => handleQuestionAnswer("OF COURSE")}
                className="pixel-btn pixel-btn-blue text-xs py-3 w-full text-center font-bold"
              >
                OF COURSE
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── STEP 3: Reward.exe (Screen 3 Screenshot) ─── */}
      {step === 3 && (
        <motion.div
          key="step-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="win98-window w-full max-w-md"
        >
          {/* Title bar */}
          <div className="win98-titlebar">
            <div className="flex items-center gap-2">
              <span className="text-[#8B0000] text-xs">❤</span>
              <span className="text-[#2B2B2B] text-[10px] font-bold">Reward.exe</span>
            </div>
            <div className="flex gap-1">
              <button className="win98-title-btn">□</button>
              <button className="win98-title-btn">□</button>
              <button className="win98-close-btn">✕</button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 flex flex-col items-center text-center">
            {/* Hello Kitty Header */}
            <div className="mb-4">
              <HelloKittyIcon className="w-20 h-20" />
            </div>

            <h2 className="text-base text-[#2B2B2B] font-bold mb-6">
              +100 Love Points
            </h2>

            {/* Achievement Pink Box */}
            <div className="w-full bg-[#FFEBF2] border-3 border-[#2B2B2B] shadow-[4px_4px_0_#2B2B2B] p-4 flex items-center gap-4 mb-6 text-left">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="text-[8px] text-[#665A50] uppercase tracking-wider mb-0.5 font-bold">
                  Achievement Unlocked
                </div>
                <div className="text-xs text-[#8B0000] font-bold">
                  Best Girlfriend Ever
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleRewardContinue}
              className="pixel-btn pixel-btn-red text-xs px-8 py-2.5 min-w-[140px]"
            >
              CONTINUE
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── STEP 4: Inventory.exe (Screen 5 Screenshot) ─── */}
      {step === 4 && (
        <motion.div
          key="step-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="win98-window w-full max-w-lg"
        >
          {/* Title bar */}
          <div className="win98-titlebar">
            <div className="flex items-center gap-2">
              <span className="text-[#8B0000] text-xs">❤</span>
              <span className="text-[#2B2B2B] text-[10px] font-bold">Inventory.exe</span>
            </div>
            <div className="flex gap-1">
              <button className="win98-title-btn">□</button>
              <button className="win98-title-btn">□</button>
              <button className="win98-close-btn">✕</button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 flex flex-col items-center text-center">
            <h2 className="text-lg text-[#2B2B2B] font-bold mb-1">
              Inventory
            </h2>
            <p className="text-[9px] text-[#8B0000] font-bold mb-6">
              Click items to open
            </p>

            {/* Inventory Item Box Buttons */}
            <div className="grid grid-cols-3 gap-3 w-full mb-6">
              {/* Hugs (FIRST) */}
              <button
                onClick={() => setActiveModal('hugs')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">🫂</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Hugs</span>
              </button>

              {/* Flowers */}
              <button
                onClick={() => setActiveModal('flowers')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">🌸</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Flowers</span>
              </button>

              {/* Memories */}
              <button
                onClick={() => setActiveModal('memories')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">📸</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Memories</span>
              </button>

              {/* Gifts */}
              <button
                onClick={() => setActiveModal('gifts')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">🎁</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Gifts</span>
              </button>

              {/* Secret Room */}
              <button
                onClick={() => setActiveModal('secret')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">🔑</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Secret</span>
              </button>

              {/* Letter (LAST) */}
              <button
                onClick={() => setActiveModal('letter')}
                className="pixel-btn bg-white p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFEBF2]"
              >
                <div className="text-2xl text-[#8B0000]">💌</div>
                <span className="text-[9px] text-[#2B2B2B] font-bold">Letter</span>
              </button>
            </div>

            {/* Final Surprise Button */}
            <button
              onClick={onCompleteFinale}
              className="pixel-btn pixel-btn-red text-xs px-8 py-3 w-full tracking-wider font-bold"
            >
              OUR FINAL SURPRISE ❤️
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── ITEM SUB-MODAL WINDOWS (Screen 6 Screenshot: flowers.exe / letter.exe / etc.) ─── */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-[#00000055] flex items-center justify-center p-4 z-50"
          >
            <div className="win98-window w-full max-w-md bg-[#FAF5E8]">
              {/* Title bar */}
              <div className="win98-titlebar">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B0000] text-xs">❤</span>
                  <span className="text-[#2B2B2B] text-[10px] font-bold">
                    {activeModal === 'hugs' && 'hugs.exe'}
                    {activeModal === 'flowers' && 'flowers.exe'}
                    {activeModal === 'letter' && 'letter.exe'}
                    {activeModal === 'memories' && 'memories.exe'}
                    {activeModal === 'gifts' && 'gifts.exe'}
                    {activeModal === 'secret' && 'secret.exe'}
                  </span>
                </div>
                <button
                  className="win98-close-btn"
                  onClick={() => setActiveModal(null)}
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col items-center text-center max-h-[80vh] overflow-y-auto w-full">
                {activeModal === 'hugs' && (
                  <div className="flex flex-col items-center text-center w-full py-2">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mb-2 flex items-center justify-center"
                    >
                      <SanrioHuggingIcon className="w-36 h-28 drop-shadow-md" />
                    </motion.div>
                    <h3 className="text-xl text-[#8B0000] font-bold mb-3 font-[family-name:var(--font-hand)]">
                      Infinite Warm Hugs Voucher 🫂
                    </h3>
                    <div className="content-box w-full text-left mb-4 shadow-[3px_3px_0_#FFB6C1]">
                      <p className="text-base text-[#3D2B1F] leading-relaxed font-[family-name:var(--font-hand)] mb-2 font-bold">
                        Redeemable anytime, anywhere:
                      </p>
                      <ul className="text-sm text-[#2B2B2B] leading-relaxed font-[family-name:var(--font-hand)] space-y-1.5 pl-4 list-disc font-bold">
                        <li>Unlimited tight hugs that make everything okay</li>
                        <li>Listening to you yap for hours about your day</li>
                        <li>Holding your hand whenever you overthink</li>
                        <li>Head pats & warm cuddles on repeat ❤️</li>
                      </ul>
                    </div>
                  </div>
                )}
                {activeModal === 'flowers' && (
                  <FlowersWindow addLove={addLove} />
                )}

                {activeModal === 'letter' && (
                  <ThemeLetterNote onBack={() => setActiveModal(null)} />
                )}

                {activeModal === 'memories' && (
                  <MemoriesWindow addLove={addLove} />
                )}

                {activeModal === 'gifts' && (
                  <GiftsWindow addLove={addLove} unlockAchievement={unlockAchievement} />
                )}

                {activeModal === 'secret' && (
                  <SecretWindow unlockAchievement={unlockAchievement} addLove={addLove} />
                )}

                {/* BACK Button */}
                {activeModal !== 'letter' && (
                  <button
                    onClick={() => setActiveModal(null)}
                    className="pixel-btn pixel-btn-red text-xs px-8 py-2.5 mt-4"
                  >
                    BACK
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
