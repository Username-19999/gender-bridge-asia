"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

type ColorBlindMode = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "highContrast";

type GameProgress = {
  quiz: boolean;
  match: boolean;
  asi: boolean;
  bsri: boolean;
  quizScore?: number;
  matchScore?: number;
  asiScore?: number;
  bsriScore?: number;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (en: string, zh: string) => string;
  gameProgress: GameProgress;
  updateGameProgress: (game: keyof GameProgress, value: boolean | number) => void;
  colorBlindMode: ColorBlindMode;
  setColorBlindMode: (mode: ColorBlindMode) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>("normal");
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    quiz: false,
    match: false,
    asi: false,
    bsri: false
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const t = (en: string, zh: string) => {
    return language === "en" ? en : zh;
  };

  const updateGameProgress = (game: keyof GameProgress, value: boolean | number) => {
    setGameProgress((prev) => ({
      ...prev,
      [game]: value
    }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, gameProgress, updateGameProgress, colorBlindMode, setColorBlindMode }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
