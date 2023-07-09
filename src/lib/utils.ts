import type { Article } from '../types';

const now = new Date();
export const formatter = new Intl.DateTimeFormat([], {
  timeZone: 'America/Vancouver',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export const getPostBySlug = (slug: string): Promise<Article> => {
  return new Promise<Article>((resolve, reject) => {
    setTimeout(() => {
      const post: Article = {
        id: "id-9876",
        slug: `/ssg/preview`,
        title: "SSG Preview",
        body: "This is a preview.",
        lastUpdate: formatter.format(new Date)
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