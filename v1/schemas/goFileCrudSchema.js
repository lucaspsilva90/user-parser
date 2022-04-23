module.exports = ({ joi }) => ({
  createFolder: joi.object({
    folderName: joi.string().required(),
  }).required(),
  uploadFile: joi.object({
    file: joi.object().required(),
    folderName: joi.string().required(),
  }).required(),
  deleteFile: joi.object({
    fileName: joi.string().required(),
    folderName: joi.string().required(),
  }).required(),
});
