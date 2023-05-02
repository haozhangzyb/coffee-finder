import { findRecordByFsqId, table } from "@/lib/airtable";
import { fetchCoffeeStoreById } from "@/lib/fetchCoffeeStores";

const getCoffeeStoreRecordByFsqId = async (req, res) => {
  const { fsq_id } = req.query;

  try {
    if (fsq_id) {
      const records = await findRecordByFsqId(fsq_id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        const {
          name,
          location: { address, locality },
          img_url,
        } = await fetchCoffeeStoreById(fsq_id);

        const createdCoffeeStore = await table.create([
          {
            fields: {
              fsq_id,
              name,
              address,
              locality,
              votes: 0,
              img_url,
            },
          },
        ]);

        res.status(200).json(createdCoffeeStore[0].fields);
      }
    } else {
      res.status(400);
      res.json({ message: "Id is missing" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreRecordByFsqId;
