import type { Article } from '../types';

export const getPostBySlug = (slug: string): Promise<Article> => {
  return new Promise<Article>((resolve, reject) => {
    setTimeout(() => {
      const post: Article = {
        id: "id-9876",
        slug: `/ssg/draft`,
        title: "SSG Draft",
        body: "This is a draft.",
        lastUpdate: new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York' })
      };
      const article = slug === post.slug ? post : null;

      if (article) {
        resolve(article);
      } else {
        reject("Not found");
      }
    }, 100);
  });
};