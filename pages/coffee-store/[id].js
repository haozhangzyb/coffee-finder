import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import localCoffeeStoreData from "../../data/coffee-stores.json";

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: localCoffeeStoreData.find(
        (store) => store.id.toString() === params.id
      ),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: localCoffeeStoreData.map((store) => ({
      params: {
        id: store.id.toString(),
      },
    })),
    fallback: true,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood } = coffeeStore;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={`Coffee Store Page${id}`} />
      </Head>

      <main>
        <Link href='/'>Back to home</Link>
        <div>Coffee Store Page {id}</div>
        <div>{name}</div>
        <div>{address}</div>
        <div>{neighbourhood}</div>
      </main>
    </>
  );
};

export default CoffeeStore;
