import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import cls from "classnames";
import useSWR from "swr";

import localCoffeeStoreData from "../../data/coffee-stores.json";

import styles from "../../styles/CoffeeStore.module.css";
import Image from "next/image";
import {
  fetchCoffeeStoreById,
  fetchCoffeeStores,
} from "@/lib/fetchCoffeeStores";
import { StoreContext } from "@/contexts/StoreContext";
import { fetcher } from "@/utils";
import favoriteCoffeeStoreByFsqId from "../api/favoriteCoffeeStoreByFsqId";
import axios from "axios";

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
  const { fsq_id } = router.query;

  const isPropsEmpty =
    props.coffeeStore === undefined ||
    Object.keys(props.coffeeStore).length === 0;

  const { data, error, mutate } = useSWR(
    `/api/getCoffeeStoreRecordByFsqId?fsq_id=${fsq_id}`,
    fetcher
  );

  if (isPropsEmpty && !data) {
    return <div>Loading...</div>;
  }

  const { name, address, locality, img_url } = isPropsEmpty
    ? data
    : props.coffeeStore;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = async () => {
    const newVote = data.votes + 1;

    try {
      await axios.put("/api/favoriteCoffeeStoreByFsqId", {
        fsq_id,
      });
    } catch (error) {
      console.log(error);
    }

    mutate({ ...data, votes: newVote });
  };

  if (error) {
    console.log(error);

    return <div>Something went wrong retrieving coffee store page</div>;
  }

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
            alt={name || "coffee-store"}
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
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width='24'
              height='24'
              alt='navigation-icon'
            />
            <p className={styles.text}>{locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='star-icon'
            />
            <p className={styles.text}>{data ? data.votes : "loading"}</p>
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
