// LoveOS — Type definitions

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface DiaryEntry {
  page: number;
  date: string;
  content: string;
}

export interface LoveLetter {
  id: number;
  title: string;
  salutation: string;
  paragraphs: string[];
  signature: string;
}

export interface Flower {
  id: string;
  name: string;
  emoji: string;
  meaning: string;
  color: string;
  bloomed: boolean;
}

export interface Memory {
  id: number;
  caption: string;
  date: string;
  bgColor: string;
  icon: string;
  photoUrl?: string;
}

export interface Question {
  question: string;
  answer: string;
  emoji: string;
}

export interface Gift {
  id: number;
  icon: string;
  label: string;
  content: string;
  opened: boolean;
}

export type AppPhase = 'boot' | 'hello' | 'desktop' | 'finale';
export type ParticleType = 'heart' | 'sakura' | 'sparkle' | 'star';
