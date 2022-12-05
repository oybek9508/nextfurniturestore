import { makeUrl, ITEMS_PER_PAGE } from "./api";
import { QuranFont } from "src/constants/QuranReader";

import { DEFAULT_RECITER } from "src/redux/defaultSettings";

const DEFAULT_VERSES_PARAMS = {
  words: true,
  translationFields: "resource_name,language_id",
  perPage: ITEMS_PER_PAGE,
  fields: `${QuranFont.Uthmani},chapter_id,hizb_number,text_imlaei_simple`,
};

const getVersesParams = (
  currentLocale,
  params,
  includeTranslationFields = true
) => {
  const defaultParams = {
    ...DEFAULT_VERSES_PARAMS,
    reciter: DEFAULT_RECITER.id,
    wordTranslationLanguage: "en",
    translations: 101,
    audio: 1,
  };

  if (!includeTranslationFields) {
    delete defaultParams.translationFields;
    delete defaultParams.translations;
  }

  return {
    ...defaultParams,
    ...params,
  };
};

export const makeVersesUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_chapter/${id}`, getVersesParams(currentLocale, params));

export const makeVersesByPageUrl = (
  id,
  currentLocale,
  params,
  includeTranslationFields = true
) =>
  makeUrl(
    `/verses/by_page/${id}`,
    getVersesParams(currentLocale, params, includeTranslationFields)
  );

export const makeJuzUrl = (id, currentLocale, params) =>
  makeUrl(`/verses/by_juz/${id}`, getVersesParams(currentLocale, params));
