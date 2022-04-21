module.exports = ({
  createFolder,
  uploadFile,
  deleteFile,
}) => [{
  path: '/v1/goFile/folder',
  method: 'PUT',
  handler: createFolder,
},
{
  path: '/v1/goFile/file/{folderId}',
  method: 'POST',
  handler: uploadFile,
  options: {
    payload: {
      allow: 'multipart/form-data',
      multipart: true,
    },
  },
},
{
  path: '/v1/goFile/file/{folderId}',
  method: 'DELETE',
  handler: deleteFile,
}];
