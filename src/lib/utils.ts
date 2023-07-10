import type { Article } from '../types';

const now = new Date();
export const formatter = new Intl.DateTimeFormat([], {
  timeZone: 'America/Vancouver',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export const getPostBySlug = (slug: string): Promise<Article | null> => {
  return new Promise<Article | null>((resolve) => {
    setTimeout(() => {
      const post: Article = {
        id: "id-9876",
        slug: `/ssg/preview`,
        title: "SSG Preview",
        body: "This is a preview.",
        lastUpdate: formatter.format(new Date)
      };
      const article = slug === post.slug ? post : null;

      resolve(article);
    }, 100);
  });
};