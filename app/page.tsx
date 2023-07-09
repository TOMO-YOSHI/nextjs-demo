import Link from 'next/link';
import { previewAPIURL } from '../lib/consts';

export default function Home() {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">Home</h1>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/static">Access /ssg/static</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href="/ssg/draft">Access /ssg/draft (End User)</Link>
      </div>
      <div className='text-center text-lg mt-2 underline'>
        <Link href={previewAPIURL}>Access /ssg/draft (Editor)</Link>
      </div>
    </main>
  )
}
