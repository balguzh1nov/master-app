"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ru" | "kk";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    // Загружаем язык из localStorage или определяем по умолчанию
    if (typeof window === "undefined") return;
    
    const savedLanguage = localStorage.getItem("language") as Language;
    let initialLanguage: Language = "ru";
    
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "kk")) {
      initialLanguage = savedLanguage;
    } else {
      // Определяем язык браузера
      if (typeof navigator !== "undefined") {
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "kk") {
          initialLanguage = "kk";
        }
      }
    }
    
    setLanguageState(initialLanguage);
    // Обновляем атрибут lang в html
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLanguage;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    // Обновляем атрибут lang в html
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  // Всегда предоставляем контекст, даже до монтирования
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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

