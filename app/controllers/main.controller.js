"use strict";

const welcome = (req, res) => {
  res.status(200).json({
    message: req.polyglot.t("welcome"),
  });
};

export { welcome };
