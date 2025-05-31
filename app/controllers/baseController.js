const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

function createController({ service, namePlural, nameSingular }) {
  return {
    getAll: catchAsync(async (req, res) => {
      const { page, limit, sortField, sortOrder, ...filters } = req.processedQuery;
      const data = await service.findAll({ page, limit, sortField, sortOrder, ...filters });

      if (!data || data.length === 0) {
        return res.status(404).json({ message: `${namePlural} not found` });
      }

      return res.json({ data: data.data, metadata: data.metadata });
    }),

    getById: catchAsync(async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }

      const entity = await service.findById(id);

      if (!entity) {
        return res.status(404).json({ message: `${nameSingular} not found` });
      }
      return res.json(entity);
    }),
  };
}

module.exports = createController;
