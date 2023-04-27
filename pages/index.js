import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import Card from "@/components/Card";

export default function Home() {
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
        <div className={styles.cardLayout}>
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
          <Card
            storeName={"TestStore"}
            storeImg={"/static/hero-image.png"}
            storeId={"TestStore"}
            className={styles.card}
          />
        </div>
      </main>
    </>
  );
}
