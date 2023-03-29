const db = require("../../utils/db");
const jwt = require("jsonwebtoken");

const ShowAPIKey = async (req, res) => {
  const { ID, Name } = req.body;
  if (!ID || !Name) return res.status(400).json({ err: "Invalid data" });

  //Getting user
  const key =
    await db.$queryRaw`SELECT Name, API_key FROM api_keys WHERE ID = ${ID} AND Name = ${Name};`;
  if (!key || key.length == 0)
    return res.status(400).json({ err: "No App found" });

  //Creating token
  const token = await jwt.sign(
    { Name: key[0].Name, API_key: key[0].API_key },
    process.env.APIKEYSECRET
  );
  return res.status(200).json({ message: `Successfully generated!`, token });
};

module.exports = ShowAPIKey;
