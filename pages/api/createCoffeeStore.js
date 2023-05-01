import { table } from "@/lib/airtable";

export default async function createCoffeeStore(req, res) {
  const { fsq_id, name, address, city, img_url } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!fsq_id) {
      return res.status(400).json({ error: "invalid fsq_id" });
    }

    const findCoffeeStore = await table
      .select({
        filterByFormula: `fsq_id = "${fsq_id}"`,
      })
      .firstPage();

    if (findCoffeeStore.length !== 0) {
      return res.status(200).json(findCoffeeStore[0].fields);
    }

    if (!fsq_id || !name || !address || !city) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const createdCoffeeStore = await table.create([
      {
        fields: {
          fsq_id,
          name,
          address,
          city,
          img_url,
          votes: 0,
        },
      },
    ]);

    res.status(200).json(createdCoffeeStore[0].fields);
  } catch (err) {
    console.error("Error creating or finding a store", err);
    return res
      .status(500)
      .json({ message: "Error creating or finding a store", err });
  }
}
