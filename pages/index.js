import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";

import localCoffeeStoreData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "@/lib/fetchCoffeeStores";
import useGetLocation from "@/hooks/useGetLocation";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/contexts/StoreContext";
import axios from "axios";

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home({ coffeeStores }) {
  const { state, dispatch } = useContext(StoreContext);

  const { nearbyStores, latitude, longitude } = state;

  const { locationError, isLoading, getLocation } = useGetLocation();

  const [isNearbyStoresLoading, setIsNearbyStoresLoading] =
    useState(false);

  useEffect(() => {
    if (latitude !== "" && longitude !== "") {
      setIsNearbyStoresLoading(true);
      axios
        .get(
          `/api/getCoffeeStoresByLocation?latitude=${latitude}&longitude=${longitude}`
        )
        .then(({ data }) => {
          dispatch({
            type: ACTION_TYPES.SET_STORES,
            payload: {
              nearbyStores: data,
            },
          });
        })
        .catch(console.error)
        .finally(() => {
          setIsNearbyStoresLoading(false);
        });
    }
  }, [latitude, longitude]);

  return (
    <>
      <Head>
        <title>Coffee Store Finder</title>
        <meta name='description' content='Find you local coffee stores' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.banner_wrapper}>
          <Banner
            findLocalStoreButtonText={"View stores nearby"}
            handleOnClick={getLocation}
            isLoading={isLoading || isNearbyStoresLoading}
          />
          {locationError !== "" && (
            <p className={styles.locationError}>
              Something went wrong: {locationError}
            </p>
          )}
        </div>
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
          />
        </div>

        {nearbyStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {nearbyStores.map((store) => (
                <Card
                  key={store.fsq_id}
                  storeName={store.name}
                  storeImg={
                    store.img_url ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  id={store.fsq_id}
                />
              ))}
            </div>
          </>
        )}

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>NYC Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  key={store.fsq_id}
                  storeName={store.name}
                  storeImg={
                    store.img_url ||
                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  }
                  id={store.fsq_id}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
