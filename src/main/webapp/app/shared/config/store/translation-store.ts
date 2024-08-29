import { defineStore } from 'pinia';

interface TranslationState {
  currentLanguage: string | undefined;
}

export const useTranslationStore = defineStore('translationStore', {
  state: (): TranslationState => ({
    currentLanguage: undefined,
  }),
  actions: {
    setCurrentLanguage(newLanguage: any) {
      this.currentLanguage = newLanguage;
      localStorage.setItem('currentLanguage', newLanguage);
    },
  },
});
