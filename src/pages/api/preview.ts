import { getPostBySlug } from '../../lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

// http://localhost:3000/api/preview?secret=MY_SECRET_TOKEN&slug='/ssg/draft'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== 'MY_SECRET_TOKEN' || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  if (typeof req.query.slug !== "string") {
    return res.status(401).json({ message: 'Invalid slug' })
  }
  const post = await getPostBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'No article exists' })
  }

  res.setPreviewData(post)

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(post.slug)
}