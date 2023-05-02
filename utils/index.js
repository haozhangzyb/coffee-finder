export const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // // Attach extra info to the error object.
    error.info = res.statusText;

    error.status = res.status;

    // console.log(res);
    throw error;
  }

  return res.json();
};

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
