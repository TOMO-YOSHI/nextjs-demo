import type { NextApiRequest, NextApiResponse } from 'next';

// http://localhost:3000/api/clear-cookie?path=/ssg/draft

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query

  if(typeof path !== "string") {
    return res.status(401).json({ message: 'Invalid path' })
  }

  res.clearPreviewData({ path })

  res.redirect('/')
}