const db = require("../../utils/db");

const BlockAPIKey = async (req, res) => {
  const { ID, Name } = req.body;
  if (!ID || !Name) return res.status(400).json({ err: "Invalid data" });

  const key = await db.$queryRaw`SELECT Blocked FROM api_keys WHERE ID = ${ID} AND Name = ${Name};`;

  if (!key || key.length == 0) return res.status(400).json({ err: "No App found" });

  await db.api_keys.update({
    where: { ID },
    data: { Blocked: !key[0].Blocked },
  });

  return res.status(200).json({
    message: `Successfully ${key[0].Blocked ? "unblocked" : "blocked"} this API key`,
  });
};

module.exports = BlockAPIKey;
