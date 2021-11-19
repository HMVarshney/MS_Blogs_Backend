module.exports = () => ({
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: 'dgusjifx3',
      api_key: '354845962199772',
      api_secret: 'fRUyfJq6OQKcg4dpkPYNbCyLn7g ',
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  email:{
    provider: 'nodemailer',
    providerOptions: {
      service: 'gmail',
      auth:{
          user: 'editor.nescii@gmail.com',
          pass: 'nesciiadmin123'
      },
      pool: true
    },
    settings: {
      defaultFrom: 'editor.nescii@gmail.com',
      defaultReplyTo: 'editor.nescii@gmail.com',
    },
  }
});


// module.exports = () => ({
//   upload: {
//     provider: "aws-s3",
//     providerOptions: {
//       accessKeyId: "AKIAIZ3FIY44LSPKJOSQ",
//       secretAccessKey: "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",
//       region: "ap-south-1",
//       params: {
//         Bucket: "nescii",
//       },
//     },
//   },
// });
