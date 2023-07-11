import '../../../src/app/globals.css'
import { useEffect, useState } from 'react';
import type { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { fetchDraftCondition, formatter } from '../../lib/utils';
import type { Article } from '../../types';
import { prodCookieCheckAPIURL, devCookieCheckAPIURL } from '@/src/lib/consts';

type MydraftData = Article;
type PageParams = {
  slug: string
}

const cookieCheckAPIURL = process.env.NODE_ENV === "production" ? prodCookieCheckAPIURL : devCookieCheckAPIURL;


export default function FallbackPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      // {
      //   params: {
      //     slug: 'blocking',
      //   },
      // },
    ],
    fallback: 'blocking', // true | false | 'blocking' This needs to be 'true' or 'blocking
  }
}

export async function getStaticProps(context: GetStaticPropsContext<PageParams, MydraftData>) {
  const { slug } = context.params ? context.params : { slug: null };
  // If you request this page with the draft mode cookies set:
  //
  // - context.draftMode will be true

  const article = {
    id: "id-1111",
    slug: `/fallback/blocking`,
    title: "SSG",
    body: `This is a fallback ${slug} page.`,
    lastUpdate: formatter.format(new Date)
  }

  return {
    props: {
      article
    }
  }
}
