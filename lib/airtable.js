const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

export const table = base("coffee-stores");

export const findRecordByFsqId = async (fsq_id) => {
  const findCoffeeStore = await table
    .select({
      filterByFormula: `fsq_id = "${fsq_id}"`,
    })
    .firstPage();

  if (findCoffeeStore.length !== 0) {
    return findCoffeeStore[0];
  }

  return {};
};
