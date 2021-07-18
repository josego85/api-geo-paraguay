"use strict";

const Department = require("models/department.model.js");

// Retrieve all departments from the database.
exports.findAll = (req, res) => {
  Department.getAll((err, data) => {
    if (err) {
      res.status(403).send({
        message: req.polyglot.t("not_retrieve_department") || err.message,
      });
    } else {
      const json = {
        success: true,
        data: data,
      };
      res.status(200).json(json);
    }
  });
};

exports.findByLngLat = (req, res) => {
  Department.findByLngLat(req.params, (err, data) => {
    if (err) {
      res.status(403).send({
        message: req.polyglot.t("not_retrieve_department") || err.message,
      });
    } else {
      const json = {
        success: true,
        data: data,
      };
      res.status(200).json(json);
    }
  });
};
