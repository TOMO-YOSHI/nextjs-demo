import '../../app/globals.css'
import React from 'react';
import { formatter } from '../../lib/utils';
import { devRevalidateAPIURL, prodRevalidateAPIURL } from '../../lib/consts';
import type { InferGetStaticPropsType } from 'next';

const revalidateAPIURL = process.env.NODE_ENV === "production" ? prodRevalidateAPIURL : devRevalidateAPIURL;

export default function Revalidate({ lastUpdate }: InferGetStaticPropsType<typeof getStaticProps>) {
  const onClickHandler = () => {
    fetch(revalidateAPIURL);
  }
  return (
    <main className="py-16">
      <h1 className="text-center text-2xl">SSG On-Demand Revalidation</h1>
      <p className="text-center text-lg mt-2">This page can be revalidated on demand.</p>
      <p className="text-center text-lg mt-2">Updated at {lastUpdate}</p>
      <br />
      <div className='text-center'>
        <button className="border-2 p-2 active:bg-yellow-400 mx-auto" onClick={onClickHandler}>Revalidate this page</button>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const lastUpdate= formatter.format(new Date);
  return {
    props: {
      lastUpdate
    }
  }
}
