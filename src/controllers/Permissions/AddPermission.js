const permissionList = require("./PermissionList");
const db = require("../../utils/db");

const AddPermission = async (req, res) => {
  const { ID, permissions } = req.body;
  if (!ID || !Number.isInteger(ID) || !permissions || !Array.isArray(permissions)) return res.status(400).json({ err: "Invalid data" });

  const exists = await db.api_keys.findUnique({
    where: {
      ID: ID,
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
  permissions.forEach((e) => {
    if (permissionList.includes(e) && !userPermissions.includes(e)) correct.push(e);
  });

  if (correct.length == 0)
    return res.status(400).json({ err: "Failed to add any permissions because it does not exists or the key already have them" });

  await db.permissions.createMany({
    data: correct.map((e) => ({ APIID: ID, permission: e })),
  });
  return res.status(200).json({ message: "Successfully added permissions!", permissions: correct });
};

module.exports = AddPermission;
