module.exports = ({
  controller: {
    createFolder,
    uploadFile,
    deleteContent,
  },
  schemas: {
    goFileCrudSchema,
  },
}) => [{
  path: '/v1/goFile/folder',
  method: 'PUT',
  handler: createFolder,
  options: {
    tags: ['api'],
    description: 'Create a folder at GoFile',
    notes: 'Create a folder at GoFile API and save this information at DB',
    validate: {
      payload: goFileCrudSchema.createFolder,
      failAction: 'ignore',
    },
    response: {
      schema: goFileCrudSchema.genericResponse,
    },
  },
},
{
  path: '/v1/goFile/file',
  method: 'POST',
  handler: uploadFile,
  options: {
    tags: ['api', 'goFile'],
    description: 'Upload a file at a specific folder at GoFile',
    notes: 'Upload a folder at GoFile API specific folder and save this information at DB',
    payload: {
      allow: 'multipart/form-data',
      multipart: true,
      output: 'file',
    },
    validate: {
      payload: goFileCrudSchema.uploadFile,
      failAction: 'ignore',
    },
    plugins: {
      'hapi-swagger': {
        payloadType: 'form',
      },
    },
    response: {
      schema: goFileCrudSchema.genericResponse,
    },
  },
},
{
  path: '/v1/goFile/file',
  method: 'DELETE',
  handler: deleteContent,
  options: {
    tags: ['api'],
    description: 'Delete a file at GoFile',
    notes: 'Delete a file at GoFile API and remove this information from DB',
    validate: {
      payload: goFileCrudSchema.deleteFile,
      failAction: 'ignore',
    },
    response: {
      schema: goFileCrudSchema.genericResponse,
    },
  },

}];
