import type { NextApiRequest, NextApiResponse } from 'next';

// http://localhost:3000/api/clear-cookie?path=/ssg/draft

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setDraftMode({ enable: false })

  res.redirect('/')
}