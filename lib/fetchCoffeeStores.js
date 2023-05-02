import { formatStoreData } from "@/utils";
import axios from "axios";

const getApiUrl = (keyword, latitude, longitude, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${keyword}&ll=${latitude},${longitude}&limit=${limit}`;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

const axiosOptions = {
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

// https://location.foursquare.com/developer/reference/place-search
// Empire State Building, New York, NY
// 40.74850546692348, -73.98567512641625
export const fetchCoffeeStores = async (
  latitude = "40.748367293677774",
  longitude = "-73.98579314908679",
  limit = 6
) => {
  const keyword = "coffee";

  try {
    // const response = await fetch(
    //   getApiUrl(keyword, latitude, longitude, limit),
    //   options
    // );
    // const data = await response.json();

    const { data } = await axios.get(
      getApiUrl(keyword, latitude, longitude, limit),
      axiosOptions
    );

    const coffeeStoreDataWithImg = await Promise.all(
      data.results.map(async (store) => {
        const img_url = await fetchCoffeeStorePhotoById(store.fsq_id);

        return formatStoreData(store, img_url);
      })
    );

    return coffeeStoreDataWithImg;
  } catch (err) {
    console.error(err);
  }
};

export const fetchCoffeeStoreById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.foursquare.com/v3/places/${id}`,
      axiosOptions
    );

    const img_url = await fetchCoffeeStorePhotoById(id);
    return formatStoreData(data, img_url);
  } catch (err) {
    console.error(err);
  }
};

// https://location.foursquare.com/developer/reference/place-photos
export const fetchCoffeeStorePhotoById = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.foursquare.com/v3/places/${id}/photos`,
      axiosOptions
    );

    const { prefix, suffix } = data[0];

    return `${prefix}300x300${suffix}`;
  } catch (err) {
    console.error(err);
  }
};
