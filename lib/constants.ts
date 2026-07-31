// LoveOS — All content data
import type { Achievement, DiaryEntry, LoveLetter, Flower, Memory, Question, Gift } from '@/types';

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    page: 1,
    date: 'The Day I Realized',
    content:
      "I don't know when it happened exactly. Maybe it was during one of our late night calls when you were yapping about something completely random and I realized I could listen to you forever. Maybe it was when you laughed — that scooter engine laugh — and I felt my whole chest warm up. But somewhere between all the teasing and the mwahs, I fell. Completely.",
  },
  {
    page: 2,
    date: 'Your Laugh',
    content:
      "People say they have a favourite song. Mine is your laugh. Not the polite one you do around other people. The real one. The one that sounds like a scooter engine starting up. The one where you can't breathe and you hit my arm even though I'm not even near you. That one. I'd do anything to hear it every single day.",
  },
  {
    page: 3,
    date: 'The Overthinking Nights',
    content:
      "You overthink. I know that. You wonder if you're enough, if you're too much, if you're doing this right. And I wish I could reach through every kilometre between us and hold your face and tell you — you've never had to earn this. My love isn't a test you can fail. You already passed. You passed the moment you existed.",
  },
  {
    page: 4,
    date: 'Distance',
    content:
      "Some nights the distance feels unbearable. I'll be lying in bed, and I'll think about how you're lying in yours, probably hugging a pillow, probably overthinking, probably wishing I was there too. And I want you to know — every single night, before I close my eyes, the last thought in my head is always you. Always.",
  },
  {
    page: 5,
    date: 'Why You',
    content:
      "People ask me why I love you. And I never know where to start. It's not one thing. It's the way you tease me and then immediately get worried I'm actually upset. It's the way you say 'mwah' like it's punctuation. It's the way you make ordinary moments feel like something I want to remember forever. It's everything. It's just you.",
  },
  {
    page: 6,
    date: 'A Promise',
    content:
      "I promise to be your safe place when the world is loud. I promise to remind you that you're loved on the days you forget. I promise to never stop writing you letters, even when we're old and I can barely hold a pen. I promise to choose you — not just today, not just tomorrow, but every single day after that. Forever, Bhonduu.",
  },
];

export const LOVE_LETTERS: LoveLetter[] = [
  {
    id: 1,
    title: 'The First Letter',
    salutation: 'My Dearest Bhonduu,',
    paragraphs: [
      "I'm writing this because sometimes I feel things so deeply that speaking them out loud doesn't feel like enough. I need the words to exist somewhere permanent. Somewhere you can return to whenever you need them.",
      "You make me blush. Actually blush. I didn't even know I was capable of that before you. One compliment from you and I'm gone. Absolutely destroyed. And you know it, don't you? Professional teaser.",
      "I love your voice. I love your random yapping. I love the way you get excited about music and want me to listen to every song you discover. I love that you have peak taste and aren't afraid to tell me about it.",
      "I just love you. Simply. Completely. Without conditions.",
    ],
    signature: 'Forever yours,\nYour blushing idiot ❤️',
  },
  {
    id: 2,
    title: 'On Quiet Days',
    salutation: 'Hey Pretty Baby,',
    paragraphs: [
      "On the quiet days, when nothing spectacular happens and we just exist in each other's space — those are my favourite days. Not the grand gestures. Not the big moments. Just you being you, and me being grateful.",
      "I think about our future sometimes. The small things. Making you breakfast. Hearing you laugh from another room. Falling asleep with you next to me instead of miles away. Every single version of the future I imagine has you in it.",
      "You make ordinary moments magical. That's not a metaphor. That's just what you do. You always have. And I never want to get used to it.",
    ],
    signature: 'With all my love,\nYour favourite person (hopefully) 💌',
  },
  {
    id: 3,
    title: 'The Important One',
    salutation: 'My Sweet Girl,',
    paragraphs: [
      "I need you to read this slowly. And I need you to believe every word.",
      "You are not a burden. You never have been. You never will be. The fact that you even worry about that breaks my heart because it means somewhere along the way, someone made you feel like your existence needed to be apologized for.",
      "You survived something most people can't even imagine. And you did it with grace, with humor, with that stubborn beautiful spirit that makes you who you are. You didn't just survive — you came out the other side still capable of loving this deeply. That's not a weakness. That's a superpower.",
      "You are not ruining my life. You ARE my life. The best part of it. The part that makes everything else worth doing.",
      "Every time you worry about being too much — I want you to know that to me, you will never be enough. I will always want more. More of your laugh. More of your voice. More of your terrible jokes. More of you.",
      "You deserve happiness. Not the kind you have to earn or justify. The kind that just exists because you exist. You deserve peace. You deserve flowers — every single flower in the world.",
      "I'm not going anywhere.",
    ],
    signature: 'I love you, forever and always,\nYours. Only yours. ❤️',
  },
];

export const FLOWERS: Flower[] = [
  { id: 'white-rose', name: 'White Rose', emoji: '🤍', meaning: 'You are my peace.', color: '#f0f0f0', bloomed: false },
  { id: 'orchid', name: 'Orchid', emoji: '💜', meaning: "You're rare.", color: '#d4a5d8', bloomed: false },
  { id: 'pink-tulip', name: 'Pink Tulip', emoji: '🌷', meaning: 'Happiness.', color: '#f8a4bc', bloomed: false },
];

export const MEMORIES: Memory[] = [
  { id: 1, caption: 'Late night calls that never feel long enough', date: '8+ Hours', bgColor: '#1b1b2f', icon: '📞', photoUrl: '/photos/calls.png' },
  { id: 2, caption: 'Playing Roblox together & matching avatars', date: 'trazify17 & Diuh_809', bgColor: '#2f1b1b', icon: '🎮', photoUrl: '/photos/roblox.png' },
  { id: 3, caption: 'When you put me onto Daniel Caesar', date: 'Always On Repeat', bgColor: '#1b2b4e', icon: '🎵', photoUrl: '/photos/daniel_caesar.png' },
  { id: 4, caption: 'When you yap about your day and I just listen and smile', date: 'Daily ❤️', bgColor: '#4e1b2d', icon: '💬', photoUrl: 'https://media.baamboozle.com/uploads/images/919357/bebf444c-02b4-4d19-9b98-beca38effe6c.gif' },
];

export const QUESTIONS: Question[] = [
  { question: "Who has the cutest laugh?", answer: "You. Always you. (Even if it sounds like a scooter engine.)", emoji: '😂' },
  { question: "Who overthinks too much?", answer: "Also you, Anvi. But I'll always be here to quiet the noise.", emoji: '🤔' },
  { question: "Who's going to remind you every day that you're loved?", answer: "Me ❤️ Without fail. Without exception.", emoji: '💕' },
  { question: "Who has the prettiest smile?", answer: "You. And it's not even close.", emoji: '✨' },
  { question: "Who has peak music taste?", answer: "You, obviously. I'm just lucky you share your playlists with me.", emoji: '🎵' },
  { question: "Who is the certified Professional Teaser?", answer: "You. World champion. Undefeated.", emoji: '😏' },
  { question: "Who makes ordinary days feel magical?", answer: "My Strawberry Shortcake. My Anvi. My home. You.", emoji: '🏡' },
  { question: "Who am I going to love forever?", answer: "You. Again. And again. And again.", emoji: '♾️' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'smile', title: 'Made Me Smile', icon: '😊', description: 'You opened LoveOS!', unlocked: false },
  { id: 'favourite', title: 'Forever Favourite', icon: '⭐', description: 'Read every diary entry', unlocked: false },
  { id: 'teaser', title: 'Professional Teaser', icon: '😏', description: 'Answered all the questions', unlocked: false },
  { id: 'scooter', title: 'Scooter Engine Laugh', icon: '🛵', description: 'Found something funny', unlocked: false },
  { id: 'music', title: 'Peak Music Taste', icon: '🎵', description: 'Opened the playlist', unlocked: false },
  { id: 'bhonduu', title: 'Certified Bhonduu', icon: '🐱', description: 'Petted the kitty 10 times', unlocked: false },
  { id: 'hugger', title: 'Best Hugger', icon: '🤗', description: 'Opened all the gifts', unlocked: false },
  { id: 'safe', title: 'My Safe Place', icon: '🏠', description: 'Read the important letter', unlocked: false },
  { id: 'strawberry', title: 'Legendary Strawberry Shortcake', icon: '🍰', description: 'Found the secret room', unlocked: false },
  { id: 'love100', title: 'Love Level 100', icon: '💖', description: 'Reached 100% love meter', unlocked: false },
];

export const GIFTS: Gift[] = [
  { id: 1, icon: '🌹', label: 'A Rose', content: 'A single white rose, because you are my peace.', opened: false },
  { id: 2, icon: '💌', label: 'A Note', content: "I'd choose you in every universe, every timeline, every life.", opened: false },
  { id: 3, icon: '⭐', label: 'A Star', content: "I named a star after you. (Okay, I can't actually do that. But if I could, I would.)", opened: false },
  { id: 4, icon: '💝', label: 'My Heart', content: "You already have this. You've had it from the start.", opened: false },
];

export const DESKTOP_ICONS = [
  { id: 'hello', icon: '❤️', label: 'Open Me' },
  { id: 'diary', icon: '📖', label: 'Diary' },
  { id: 'memories', icon: '📸', label: 'Our Memories' },
  { id: 'letters', icon: '💌', label: 'Love Letters' },
  { id: 'playlist', icon: '🎵', label: 'Playlist' },
  { id: 'flowers', icon: '🌹', label: 'Flowers' },
  { id: 'gifts', icon: '🎁', label: 'Gifts' },
  { id: 'achievements', icon: '⭐', label: 'Achievements' },
  { id: 'questions', icon: '❓', label: 'Questions' },
  { id: 'secret', icon: '🌸', label: 'Secret' },
  { id: 'forever', icon: '🧸', label: 'Forever' },
];

export const BOOT_MESSAGES = [
  'Initializing LoveOS v1.0...',
  'Loading Memories...',
  'Loading Happiness...',
  'Loading Anvi...',
  'Loading Forever...',
  'Loading Love...',
  'Finished ❤️',
];

export const HELLO_MESSAGES = [
  'Hi Anvi...',
  "I've been making something.",
  'Every time I miss you...',
  'I end up making something that reminds me of you.',
  "Happy National Girlfriend's Day ❤️",
];

export const FINAL_MESSAGE = [
  "Happy National Girlfriend's Day,",
  'My Anvi.',
  '',
  'Thank you for making every ordinary day feel magical.',
  'Thank you for making me laugh harder than anyone else.',
  "Thank you for making me feel loved in ways I didn't know were possible.",
  '',
  'Even when you overthink...',
  "Even when you're scared...",
  'Even when life feels heavy...',
  '',
  "I'll still be here.",
  '',
  'You never have to earn my love.',
  'You already have it.',
  '',
  "Distance doesn't change that.",
  "Time won't change that.",
  "Tomorrow won't change that.",
  '',
  "I'd still choose you.",
  'Again.',
  'Again.',
  'And again.',
  '',
  'I love you.',
  'Forever.',
];
