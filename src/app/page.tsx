import Link from 'next/link';
import { devPreviewAPIURL, prodPreviewAPIURL, devClearCookieAPIURL, prodClearCookieAPIURL } from '../lib/consts';

const previewAPIURL = process.env.NODE_ENV === "production" ? prodPreviewAPIURL : devPreviewAPIURL;

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
      <h2 className="text-center text-xl">Preview</h2>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/preview">Access /ssg/preview (End User)</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href={previewAPIURL}>Access /ssg/preview (Editor)</Link>
      </div>
      <br />
      <div className='text-center mt-2'>
        <Link className='border p-1' href={clearCookieAPIURL}>clear preview cookie</Link>
      </div>
    </main>
  )
}
