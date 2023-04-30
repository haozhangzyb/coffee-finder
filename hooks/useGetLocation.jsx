import { ACTION_TYPES, StoreContext } from "@/contexts/StoreContext";
import { useContext, useState } from "react";

export default function useGetLocation() {
  const [locationError, setLocationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useContext(StoreContext);

  const getLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: ACTION_TYPES.SET_LOCATION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });

        setIsLoading(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { locationError, isLoading, getLocation };
}
