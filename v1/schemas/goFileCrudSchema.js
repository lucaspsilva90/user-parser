module.exports = ({ joi }) => ({
  createFolder: joi.object({
    folderName: joi.string().required(),
  }).required().label('CreateFile'),
  uploadFile: joi.object({
    file: joi.any().meta({ swaggerType: 'file' }).required(),
    folderName: joi.string().required(),
  }).required().label('UploadFile'),
  deleteFile: joi.object({
    fileName: joi.string().required(),
    folderName: joi.string().required(),
  }).required().label('DeleteFile'),
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
