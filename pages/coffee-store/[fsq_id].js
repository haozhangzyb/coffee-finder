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
    (store) => store.fsq_id === params.fsq_id
  );

  if (!coffeeStore) {
    coffeeStore = {};
  }

  // SSR
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
        fsq_id: store.fsq_id,
      },
    })),
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { fsq_id } = router.query;

  const { state } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);

  const isCoffeeStoreEmpty =
    coffeeStore === undefined || Object.keys(coffeeStore).length === 0;

  const handleGetCoffeeStoreVotes = async () => {
    try {
      const res = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fsq_id }),
      });

      const data = await res.json();
      return data.votes;
    } catch (err) {
      console.error(err);
    }
  };

  // csr fallback
  useEffect(() => {
    async function fetchCoffeeStoreWithVotes() {
      const votes = await handleGetCoffeeStoreVotes(fsq_id);

      // staticProps does not have this store
      if (isCoffeeStoreEmpty) {
        const coffeeStoreFromContext = state.nearbyStores.find(
          (store) => store.fsq_id === fsq_id
        );

        // if store is in context, use that
        if (coffeeStoreFromContext) {
          setCoffeeStore({
            ...coffeeStoreFromContext,
            votes,
          });
        }
        // TODO: this causes bug: if store is not in context, fetch it
        else {
          const coffeeStoreById = await fetchCoffeeStoreById(fsq_id);
          setCoffeeStore({
            ...coffeeStoreById,
            votes,
          });
        }
      }
      // staticProps has this store, we can use that
      else {
        setCoffeeStore({
          ...coffeeStore,
          votes,
        });
      }
    }

    fetchCoffeeStoreWithVotes();
  }, [fsq_id]);

  if (isCoffeeStoreEmpty) {
    return <div>Loading...</div>;
  }

  const { name, location, img_url, votes } = coffeeStore;

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
            <p className={styles.text}>{votes}</p>
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
