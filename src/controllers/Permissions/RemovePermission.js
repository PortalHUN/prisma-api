const db = require("../../utils/db");

const RemovePermission = async (req, res) => {
  const { ID, permissions } = req.body;
  if (!ID || !permissions || permissions.length == 0) return res.status(400).json({ err: "Invalid data" });

  const exists = await db.api_keys.findUnique({
    where: {
      ID,
    },
    select: {
      ID: true,
      permissions: {
        select: {
          permission: true,
        },
      },
    },
  });

  if (!exists) return res.status(400).json({ err: "No App found" });

  let userPermissions = [];
  exists.permissions.forEach((e) => userPermissions.push(e.permission));

  let correct = [];
  permissions.forEach((e) => (userPermissions.includes(e) ? correct.push(e) : null));

  if (!correct || correct.length == 0)
    return res.status(400).json({ err: "Unable to delete permissions", permissions: permissions });

  await db.permissions.deleteMany({
    where: {
      AND: [
        { APIID: ID },
        {
          permission: {
            in: correct,
          },
        },
      ],
    },
  });

  return res.status(200).json({ message: "Successfully deleted permissions", permissions: correct });
};

module.exports = RemovePermission;
