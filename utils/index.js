export const fetcher = (url) => fetch(url).then((res) => res.json());

export const formatStoreData = (store, img_url) => {
  const {
    fsq_id,
    name,
    location: { address, locality },
  } = store;

  return {
    fsq_id,
    name,
    address,
    locality,
    img_url,
  };
};
