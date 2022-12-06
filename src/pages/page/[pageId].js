import React, { useEffect, useState } from "react";
import { getPagesLookup, getVersesByPage } from "src/api/quran-page-api";
import { BASE_URL } from "/src/api/api";
import { useRouter } from "next/router";
import axios from "axios";
import { isValidPageId } from "src/utils/validator";
import { getAllChaptersData } from "src/utils/chapters";
import {
  ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { formatStringNumber } from "src/utils/number";
import Error from "../_error";
import DataContext from "src/context/DataContext";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";

const Page = ({ chaptersData, pageData, hasError }) => {
  const router = useRouter();
  const {
    query: { pageId },
  } = router;
  console.log("pageData", pageData);

  if (hasError) {
    return <Error statusCode={500} />;
  }

  return (
    <DataContext.Provider value={chaptersData}>
      <ReadingPreferenceTab initialData={pageData} id={String(pageId)} />
    </DataContext.Provider>
  );
};

export const getStaticProps = async ({ params, locale }) => {
  let pageId = String(params.pageId);

  if (!isValidPageId(pageId)) {
    return {
      notFound: true,
    };
  }

  try {
    const pagesLookupResponse = await getPagesLookup({
      pageNumber: Number(pageId),
    });
    const chaptersData = await getAllChaptersData(locale);
    const pageData = await getVersesByPage(pageId, locale, {
      perPage: "all",
      filterPageWords: true,
    });
    pageData.pagesLookup = pagesLookupResponse;
    return {
      props: {
        chaptersData,
        pageData,
      },
      revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
    };
  } catch (error) {
    return {
      props: {
        hasError: true,
      },
      revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS,
    };
  }
};

export const getStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default Page;
