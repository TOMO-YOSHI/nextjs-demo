import Link from 'next/link';
import { devDraftAPIURL, prodDraftAPIURL, devClearCookieAPIURL, prodClearCookieAPIURL } from '../lib/consts';

const draftAPIURL = process.env.NODE_ENV === "production" ? prodDraftAPIURL : devDraftAPIURL;

const clearCookieAPIURL = process.env.NODE_ENV === "production" ? prodClearCookieAPIURL : devClearCookieAPIURL;

export default function Home() {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">Next.js SSG experimental Website</h1>
      <br />
      <h2 className="text-center text-xl">Static</h2>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/static">Access /ssg/static</Link>
      </div>
      <br />
      <hr />
      <br />
      <h2 className="text-center text-xl">Revalidation</h2>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/revalidate">Access /ssg/revalidate</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/ondemand-revalidate">Access /ssg/ondemand-revalidate</Link>
      </div>
      <br />
      <hr />
      <br />
      <h2 className="text-center text-xl">Draft</h2>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/draft">Access /ssg/draft</Link>
      </div>
      <div className='text-center mt-6'>
        <Link className='border-2 p-2 active:bg-yellow-400' href={draftAPIURL}>get draft cookie</Link>
      </div>
      <br />
      <div className='text-center mt-2'>
        <Link className='border-2 p-2 active:bg-yellow-400' href={clearCookieAPIURL}>clear draft cookie</Link>
      </div>
    </main>
  )
}
