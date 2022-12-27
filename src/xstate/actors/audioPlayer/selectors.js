import { DEFAULT_RECITER } from "src/redux/defaultSettings";

export const selectIsUsingDefaultReciter = (state) =>
  state.context.reciterId === DEFAULT_RECITER.id;

export const selectIsVerseBeingPlayed = (state, verseKey) => {
  const { surah, ayahNumber } = state.context;
  return (
    state.matches("VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING") &&
    makeVerseKey(surah, ayahNumber) === verseKey
  );
};

export const selectIsVerseLoading = (state, verseKey) => {
  const { surah, ayahNumber } = state.context;
  return selectIsLoading(state) && makeVerseKey(surah, ayahNumber) === verseKey;
};

export const selectIsAudioPlaying = (state) =>
  state.matches("VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING");

export const selectIsPlayingCurrentChapter = (state, chapterId) => {
  const isAudioPlaying = selectIsAudioPlaying(state);
  const currentSurah = state.context.surah;
  return isAudioPlaying && currentSurah === chapterId;
};

export const selectIsLoading = (state) => state.hasTag("loading");

export const selectIsLoadingCurrentChapter = (state, chapterId) => {
  const isLoading = selectIsLoading(state);
  const currentSurah = state.context.surah;
  return isLoading && currentSurah === chapterId;
};
