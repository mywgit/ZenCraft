"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, UI_TRANSLATIONS } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("zencraft_lang") as Language;
    if (saved && UI_TRANSLATIONS[saved]) {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("zh")) setLangState("zh");
      else if (browserLang.startsWith("es")) setLangState("es");
      else if (browserLang.startsWith("pt")) setLangState("pt");
      else if (browserLang.startsWith("de")) setLangState("de");
      else if (browserLang.startsWith("fr")) setLangState("fr");
      else if (browserLang.startsWith("ja")) setLangState("ja");
      else setLangState("en");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("zencraft_lang", newLang);
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
