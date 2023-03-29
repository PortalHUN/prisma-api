const jwt = require("jsonwebtoken");
const db = require("../utils/db");

const CheckAPIKey = async (req, res, next) => {
  const header_token = req.headers["x-api-key"];

  let obj;
  try {
    obj = await jwt.verify(header_token, process.env.APIKEYSECRET);
  } catch (e) {
    return res.status(403).json({ err: "Invalid JSON Token in header" });
  }

  const key = await db.api_keys.findFirst({
    where: {
      AND: [{ Name: obj.Name }, { API_key: obj.API_key }],
    },
    select: {
      Name: true,
      API_key: true,
      Admin: true,
      Blocked: true,
      permissions: {
        select: {
          permission: true,
        },
      },
    },
  });
  if (!key || key.length == 0) return res.status(403).json({ err: "Invalid JSON Token in header" });
  else if (obj.Name != key.Name || obj.API_key != key.API_key)
    return res.status(403).json({ err: "Invalid JSON Token in header" });
  else if (key.Blocked == true) return res.status(403).json({ err: "This key is blocked" });

  let permissionWrap = [];
  key.permissions.forEach((e) => {
    permissionWrap.push(e.permission);
  });

  req.api = key;
  req.api.permissions = permissionWrap;
  next();
};

module.exports = CheckAPIKey;
