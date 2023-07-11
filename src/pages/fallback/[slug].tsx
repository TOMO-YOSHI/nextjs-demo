import '../../../src/app/globals.css'
import { useEffect, useState } from 'react';
import type { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { formatter } from '../../lib/utils';
import type { Article } from '../../types';

type MydraftData = Article;
type PageParams = {
  slug: string
}

export default function FallbackPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">{article?.title}</h1>
      <p className="text-center text-lg mt-2">{article?.body}</p>
      <p className="text-center text-lg mt-2">Updated at {article?.lastUpdate}</p>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // true | false | 'blocking' This needs to be 'true' or 'blocking
  }
}

export async function getStaticProps(context: GetStaticPropsContext<PageParams, MydraftData>) {
  const { slug } = context.params ? context.params : { slug: null };

  if(slug && slug.length < 5) {
    return {
      notFound: true // Show 404 page
    }
  }

  const article = {
    id: "id-1111",
    slug: `/fallback/blocking`,
    title: "SSG Fallback",
    body: `This is a fallback ${slug} page.`,
    lastUpdate: formatter.format(new Date)
  }

  return {
    props: {
      article
    }
  }
}
