import { findRecordByFsqId, table } from "@/lib/airtable";

const favoriteCoffeeStoreByFsqId = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "We only support POST" });
  }

  const { fsq_id } = req.body;

  if (!fsq_id) {
    return res.status(400).json({ message: "Missing fsq_id" });
  }

  try {
    const record = await findRecordByFsqId(fsq_id);

    if (Object.keys(record).length === 0) {
      return res
        .status(404)
        .json({ message: "Store not found. Invalid fsq_id" });
    }

    const updatedRecord = await table.update([
      {
        id: record.id,
        fields: {
          votes: record.fields.votes + 1,
        },
      },
    ]);

    res.status(200).json(updatedRecord[0].fields);
  } catch (err) {
    res.status(500).json({ message: "Error favoring a store", err });
  }
  // res.status(200).json({ message: "OK", data: { fsq_id } });
};

export default favoriteCoffeeStoreByFsqId;
