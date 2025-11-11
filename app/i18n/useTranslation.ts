"use client";

import ruTranslations from "./translations/ru.json";
import kkTranslations from "./translations/kk.json";
import { useLanguage } from "./context";

export { useLanguage };

type TranslationKey = 
  | `common.${keyof typeof ruTranslations.common}`
  | `home.${keyof typeof ruTranslations.home}`
  | `header.${keyof typeof ruTranslations.header}`
  | `footer.${keyof typeof ruTranslations.footer}`
  | `master.${keyof typeof ruTranslations.master}`
  | `requests.${keyof typeof ruTranslations.requests}`
  | `myRequests.${keyof typeof ruTranslations.myRequests}`
  | `register.${keyof typeof ruTranslations.register}`
  | `login.${keyof typeof ruTranslations.login}`
  | `loginSpecialist.${keyof typeof ruTranslations.loginSpecialist}`
  | `settings.${keyof typeof ruTranslations.settings}`
  | `search.${keyof typeof ruTranslations.search}`
  | `knowledgeBase.${keyof typeof ruTranslations.knowledgeBase}`
  | `vacancies.${keyof typeof ruTranslations.vacancies}`;

const translations = {
  ru: ruTranslations,
  kk: kkTranslations,
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback на русский, если перевод не найден
        value = translations.ru;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Возвращаем ключ, если перевод не найден
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return { t, language };
}

