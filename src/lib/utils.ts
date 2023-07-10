import type { Article } from '../types';

const now = new Date();
export const formatter = new Intl.DateTimeFormat([], {
  timeZone: 'America/Vancouver',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export const getPostBySlug = (slug: string): Promise<Article> => {
  return new Promise<Article>((resolve) => {
    setTimeout(() => {
      const posts: Article[] = [
        {
          id: "id-1234",
          slug: "/ssg/static",
          title: "SSG",
          body: "This is a static page.",
          lastUpdate: formatter.format(new Date)
        },
        {
          id: "id-9876",
          slug: "/ssg/draft",
          title: "SSG draft",
          body: "This is a draft.",
          lastUpdate: formatter.format(new Date)
        }
      ];
      const article = posts.filter(post => post.slug.includes(slug))[0];

      resolve(article);
    }, 100);
  });
};

export const fakeFetch = (url: string, slug: string | null): Promise<Article | null> => {
  return new Promise<Article | null>((resolve) => {
    setTimeout(() => {
      const posts: Article[] = url.includes('draft') ? [
        {
          id: "id-1234",
          slug: "/ssg/static",
          title: "SSG",
          body: "This is a static page.",
          lastUpdate: formatter.format(new Date)
        },
        {
          id: "id-9876",
          slug: "/ssg/draft",
          title: "SSG draft",
          body: "This is a draft.",
          lastUpdate: formatter.format(new Date)
        }
      ] : [
        {
          id: "id-1234",
          slug: "/ssg/static",
          title: "SSG",
          body: "This is a static page.",
          lastUpdate: formatter.format(new Date)
        }
      ]

      if(!slug) {
        resolve(null);
        return;
      }
      const article = posts.filter(post => post.slug.includes(slug))[0];

      resolve(article);
    }, 100);
  });
};

export const fetchDraftCondition = async (apiURL: string): Promise<{isDraft: boolean}> => {
  return await fetch(apiURL).then(res => res.json());
};