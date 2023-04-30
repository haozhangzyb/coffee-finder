import { useState } from "react";

export default function useGetLocation() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setIsLoading(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { latitude, longitude, locationError, isLoading, getLocation };
}
