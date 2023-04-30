import React from "react";

import styles from "./Banner.module.css";

const Banner = ({
  findLocalStoreButtonText,
  handleOnClick,
  isLoading,
}) => {
  const buttonText = isLoading
    ? "Loading..."
    : "Discover your local coffee shop";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee </span>
        <span className={styles.title2}>Finder</span>
      </h1>
      <p className={styles.subTitle}>{buttonText}</p>
      <button className={styles.button} onClick={handleOnClick}>
        {findLocalStoreButtonText}
      </button>
    </div>
  );
};

export default Banner;
