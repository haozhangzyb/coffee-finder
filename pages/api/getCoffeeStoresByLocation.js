import { fetchCoffeeStores } from "@/lib/fetchCoffeeStores";

const getCoffeeStoresByLocation = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { latitude, longitude, limit } = req.query;
    if (!latitude || !longitude) {
      res
        .status(400)
        .json({ message: "Latitude or longitude is missing" });
    }

    const coffeeStores = await fetchCoffeeStores(
      latitude,
      longitude,
      limit ? limit : null
    );
    res.status(200).json(coffeeStores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoresByLocation;
