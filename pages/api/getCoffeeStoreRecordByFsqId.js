import { findRecordByFsqId, table } from "@/lib/airtable";
import { fetchCoffeeStoreById } from "@/lib/fetchCoffeeStores";

const getCoffeeStoreRecordByFsqId = async (req, res) => {
  const { fsq_id } = req.query;

  try {
    if (fsq_id) {
      const record = await findRecordByFsqId(fsq_id);

      if (Object.keys(record).length !== 0) {
        res.json(record.fields);
      } else {
        const store = await fetchCoffeeStoreById(fsq_id);

        const createdCoffeeStore = await table.create([
          {
            fields: {
              ...store,
              votes: 0,
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
    console.log(error);

    res.status(500);
    res.json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreRecordByFsqId;
