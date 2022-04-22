module.exports = ({
  createFolder,
  uploadFile,
  deleteContent,
}) => [{
  path: '/v1/goFile/folder',
  method: 'PUT',
  handler: createFolder,
},
{
  path: '/v1/goFile/file',
  method: 'POST',
  handler: uploadFile,
  options: {
    payload: {
      allow: 'multipart/form-data',
      multipart: true,
      output: 'file',
    },
  },
},
{
  path: '/v1/goFile/file',
  method: 'DELETE',
  handler: deleteContent,
}];
