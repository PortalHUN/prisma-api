const CheckPermission = (param) => {
  return (req, res, next) => {
    if (req.api.Admin) return next();
    else if (param == "Admin" && !req.api.Admin) return res.status(403).json({ err: "You must have Admin privileges" });

    let bad = [];
    param.forEach((e) => {
      if (!req.api.permissions.includes(e)) bad.push(e);
    });
    if (bad != 0) return res.status(403).json({ err: "Missing permissions", permissions: bad });
    next();
  };
};

module.exports = CheckPermission;
