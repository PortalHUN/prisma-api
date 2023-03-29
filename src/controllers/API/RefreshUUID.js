const db = require("../../utils/db");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const BlockAPIKey = async (req, res) => {
  const { ID, Name } = req.body;
  if (!ID || !Name) return res.status(400).json({ err: "Invalid data" });

  const key =
    await db.$queryRaw`SELECT Name FROM api_keys WHERE ID = ${ID} AND Name = ${Name};`;

  if (!key || key.length == 0)
    return res.status(400).json({ err: "No App found" });

  const finish = await db.api_keys.update({
    where: { ID },
    data: { API_key: uuid.v4() },
  });

  const token = await jwt.sign(
    { Name: finish.Name, API_key: finish.API_key },
    process.env.APIKEYSECRET
  );

  return res.status(200).json({
    message: "Successfully refreshed uuid",
    token,
  });
};

module.exports = BlockAPIKey;
