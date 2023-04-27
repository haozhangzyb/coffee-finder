import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";

import localCoffeeStoreData from "../data/coffee-stores.json";

export async function getStaticProps() {
  return {
    props: {
      coffeeStoreData: localCoffeeStoreData,
    },
  };
}

export default function Home({ coffeeStoreData }) {
  const handleOnBannerButtonClick = () => {
    console.log("Banner button clicked");
  };

  return (
    <>
      <Head>
        <title>Coffee Store Finder</title>
        <meta name='description' content='Generated by create next app' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          findLocalStoreButtonText={"View stores nearby"}
          handleOnClick={handleOnBannerButtonClick}
        />
        <Image
          src='/static/hero-image.png'
          alt='hero image'
          width={700}
          height={400}
          className={styles.heroImage}
        />
        {coffeeStoreData.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStoreData.map((store) => (
                <Card
                  key={store.id}
                  storeName={store.name}
                  storeImg={store.imgUrl}
                  storeId={store.id}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
