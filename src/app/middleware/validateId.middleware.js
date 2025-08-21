const validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'ID must be a positive number',
    });
  }
  req.validatedId = id;
  next();
};

module.exports = validateId;
