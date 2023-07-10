import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const checkPrerenderBypass = (req: NextApiRequest) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  return "__prerender_bypass" in cookies;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (checkPrerenderBypass(req)) {
    res.send({isDraft: true})
  } else {
    res.send({isDraft: false})
  }
}