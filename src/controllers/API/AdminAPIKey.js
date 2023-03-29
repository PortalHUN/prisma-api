const db = require("../../utils/db");

const AdminAPIKey = async (req, res) => {
  const { ID, Name } = req.body;
  if (!ID || !Name) return res.status(400).json({ err: "Invalid data" });

  const key =
    await db.$queryRaw`SELECT Admin FROM api_keys WHERE ID = ${ID} AND Name = ${Name};`;

  if (!key || key.length == 0)
    return res.status(400).json({ err: "No App found" });

  await db.api_keys.update({
    where: { ID },
    data: { Admin: !key[0].Admin },
  });

  return res.status(200).json({
    message: key[0].Admin
      ? "Successfully removed Admin privileges"
      : "Successfully added Admin privileges",
  });
};

module.exports = AdminAPIKey;
