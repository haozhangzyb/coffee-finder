import { findRecordByFsqId } from "@/lib/airtable";

const getCoffeeStoreRecordById = async (req, res) => {
  const { fsq_id } = req.query;

  try {
    if (fsq_id) {
      const records = await findRecordByFsqId(fsq_id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: `id could not be found` });
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

export default getCoffeeStoreRecordById;
