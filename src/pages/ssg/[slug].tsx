import '../../../src/app/globals.css'
import { useEffect, useState } from 'react';
import type { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { fakeFetch, fetchDraftCondition } from '../../lib/utils';
import type { Article } from '../../types';
import { prodCookieCheckAPIURL, devCookieCheckAPIURL } from '@/src/lib/consts';

type MydraftData = Article;
type PageParams = {
  slug: string
}

const cookieCheckAPIURL = process.env.NODE_ENV === "production" ? prodCookieCheckAPIURL : devCookieCheckAPIURL;


export default function SsgPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [ isDraft, setIsDraft ] = useState(false);

  useEffect(() => {
    (async()=>{
      const res = await fetchDraftCondition(cookieCheckAPIURL)
      setIsDraft(res.isDraft);
    })()
  }, []);

  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">{article?.title}</h1>
      <p className="text-center text-xl">{isDraft ? "(Draft Enabled)" : "(NOT Draft)"}</p>
      <p className="text-center text-lg mt-2">{article?.body}</p>
      <p className="text-center text-lg mt-2">Updated at {article?.lastUpdate}</p>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'static',
        },
      },
    ],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context: GetStaticPropsContext<PageParams, MydraftData>) {
  const { slug } = context.params ? context.params : { slug: null };
  // If you request this page with the draft mode cookies set:
  //
  // - context.draftMode will be true
  const url = context.draftMode
  ? 'https://draft.example.com'
  : 'https://production.example.com';

  const article = await fakeFetch(url, slug);

  if (!article) {
    return {
      notFound: true // Show 404 page
      // redirect: {
      //   destination: "/ssg/static",
      // },
    }
  }

  return {
    props: {
      article
    }
  }
}
