import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Coffee Store Page{id}</title>
        <meta name='description' content={`Coffee Store Page${id}`} />
      </Head>

      <main>
        <Link href='/'>Back to home</Link>
        <div>Coffee Store Page {id}</div>
      </main>
    </>
  );
};

export default CoffeeStore;
