module.exports = ({ joi }) => ({
  genericResponse: joi.object({
    status: joi.string(),
    info: joi.object({
      responseId: joi.string(),
      service: joi.string(),
      message: joi.string(),
      statusCode: joi.number(),
    }),
  }).label('GenericResponse'),
});
