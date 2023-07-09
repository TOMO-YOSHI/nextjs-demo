import '../../../src/app/globals.css'
import type { GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { formatter } from '../../lib/utils';
import type { Article } from '../../types';

type MyPreviewData = Article;
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

export async function getStaticProps(context: GetStaticPropsContext<PageParams, MyPreviewData>) {
  const { slug } = context.params ? context.params : { slug: null };
  // If you request this page with the preview mode cookies set:
  //
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  if (context.preview && slug === 'preview') {
    return {
      props: {
        article: context.previewData
      }
    }
  }

  const article: Article | null = slug === 'static' ? {
    id: "id-1234",
    slug: `/ssg/static`,
    title: "SSG",
    body: "This is a static page.",
    lastUpdate: formatter.format(new Date)
  } : null;

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
