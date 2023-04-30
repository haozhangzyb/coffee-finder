import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import cls from "classnames";

import localCoffeeStoreData from "../../data/coffee-stores.json";

import styles from "../../styles/CoffeeStore.module.css";
import Image from "next/image";
import {
  fetchCoffeeStoreById,
  fetchCoffeeStores,
} from "@/lib/fetchCoffeeStores";
import { StoreContext } from "@/contexts/StoreContext";

export async function getStaticProps({ params }) {
  const coffeeStoreData = await fetchCoffeeStores();

  let coffeeStore = coffeeStoreData.find(
    (store) => store.fsq_id === params.id
  );

  // SSR fallback
  // if (!coffeeStore) {
  //   coffeeStore = await fetchCoffeeStoreById(params.id);
  // }

  return {
    props: {
      coffeeStore,
    },
  };
}

export async function getStaticPaths() {
  const coffeeStoreData = await fetchCoffeeStores();

  return {
    paths: coffeeStoreData.map((store) => ({
      params: {
        id: store.fsq_id,
      },
    })),
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { state } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);

  // csr fallback
  useEffect(() => {
    const isPropsEmpty = Object.keys(props.coffeeStore).length === 0;

    if (isPropsEmpty) {
      setCoffeeStore(
        state.nearbyStores.find((store) => store.fsq_id === id)
      );
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, location, img_url } = coffeeStore;

  const handleUpvoteButton = () => {};

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              img_url ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='pin-icon'
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width='24'
              height='24'
              alt='navigation-icon'
            />
            <p className={styles.text}>{location.locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='star-icon'
            />
            <p className={styles.text}>1</p>
          </div>

          <button
            className={styles.upvoteButton}
            onClick={handleUpvoteButton}
          >
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
