const getApiUrl = (keyword, latitude, longitude, limit = 10) => {
  return `https://api.foursquare.com/v3/places/search?query=${keyword}&ll=${latitude},${longitude}&limit=${limit}`;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.FOURSQUARE_API_KEY,
  },
};

export const fetchCoffeeStores = async () => {
  const keyword = "coffee";
  const latitude = 33.93342172366851;
  const longitude = -84.16958518455495;
  const limit = 10;

  try {
    const response = await fetch(
      getApiUrl(keyword, latitude, longitude, limit),
      options
    );
    const data = await response.json();

    const coffeeStoreDataWithImg = await Promise.all(
      data.results.map(async (store) => {
        const img_url = await fetchCoffeeStorePhotoById(store.fsq_id);

        return {
          ...store,
          img_url,
        };
      })
    );

    return coffeeStoreDataWithImg;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCoffeeStorePhotoById = async (id) => {
  try {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/${id}/photos`,
      options
    );
    const data = await res.json();

    const { prefix, suffix } = data[0];

    return `${prefix}300x300${suffix}`;
  } catch (err) {
    console.error(err);
  }
};
