import Link from 'next/link';
import { devPreviewAPIURL, prodPreviewAPIURL, devClearCookieAPIURL, prodClearCookieAPIURL } from '../lib/consts';

const previewAPIURL = process.env.NODE_ENV === "production" ? prodPreviewAPIURL : devPreviewAPIURL;

const clearCookieURL = process.env.NODE_ENV === "production" ? prodClearCookieAPIURL : devClearCookieAPIURL;

export default function Home() {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">Home</h1>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/static">Access /ssg/static</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/preview">Access /ssg/preview (End User)</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href={previewAPIURL}>Access /ssg/preview (Editor)</Link>
      </div>
      <div className='text-center mt-2'>
        <Link href={clearCookieURL}>clear preview cookie</Link>
      </div>
    </main>
  )
}
