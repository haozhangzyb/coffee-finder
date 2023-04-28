import Image from "next/image";
import Link from "next/link";
import React from "react";
import cls from "classnames";

import styles from "./Card.module.css";

const Card = ({ storeName, storeImg, id }) => {
  return (
    <Link href={`coffee-store/${id}`} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <h2 className={styles.cardHeader}>{storeName}</h2>
        <Image
          src={storeImg}
          alt={storeName}
          width={260}
          height={160}
          className={styles.cardImage}
        />
      </div>
    </Link>
  );
};

export default Card;
