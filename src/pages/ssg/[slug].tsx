import '../../../src/app/globals.css'
import type { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { fakeFetch } from '../../lib/utils';
import type { Article } from '../../types';

type MydraftData = Article;
type PageParams = {
  slug: string
}

export default function SsgPage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
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
    paths: [
      {
        params: {
          slug: 'static',
        },
      },
    ],
    fallback: 'blocking', // true | false | 'blocking'
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
