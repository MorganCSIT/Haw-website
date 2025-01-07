import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

export type Language = 'en' | 'fr' | 'th';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      }
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        // Restore language on page load
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
      }
    }
  )
);