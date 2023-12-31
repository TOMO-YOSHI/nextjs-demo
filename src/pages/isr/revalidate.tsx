import '../../app/globals.css'
import React from 'react';
import { formatter } from '../../lib/utils';
import type { InferGetStaticPropsType } from 'next';

export default function Revalidate({ lastUpdate }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">ISR Revalidation</h1>
      <p className="text-center text-lg mt-2">This page is automatically revalidated every 10s.</p>
      <p className="text-center text-lg mt-2">Updated at {lastUpdate}</p>
    </main>
  )
}

export async function getStaticProps() {
  const lastUpdate= formatter.format(new Date);
  return {
    props: {
      lastUpdate
    },
    revalidate: 10, // In seconds
  }
}
