const db = require("../../utils/db");
const jwt = require("jsonwebtoken");

const createAPIKey = async (req, res) => {
  const { Name } = req.body;

  if (!Name || Name.length == 0) return res.status(400).json({ err: "Invalid data" });

  const exists = await db.api_keys.findUnique({
    where: {
      Name,
    },
  });
  if (exists) return res.status(400).json({ err: "This API Key Name is already in use." });

  const key = await db.api_keys.create({
    data: {
      Name,
    },
  });

  const token = await jwt.sign({ Name: key.Name, API_key: key.API_key }, process.env.APIKEYSECRET);
  return res.status(200).json({ message: `Successfully created ${key.Name}!`, token });
};

module.exports = createAPIKey;
