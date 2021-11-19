// module.exports = ({ env }) => ({
//   defaultConnection: "default",
//   connections: {
//     default: {
//       connector: "mongoose",
//       settings: {
// //         host: env('DATABASE_HOST', '127.0.0.1'),
//         host: '127.0.0.1',
// //         srv: env.bool('DATABASE_SRV', false),
//         srv: false,
// //         port: env.int('DATABASE_PORT', 27017),
//         port: 27017,
// //         database: env('DATABASE_NAME', 'nescii-blog'),
//         database: 'nescii-blog',
// //         username: env('DATABASE_USERNAME', null),
//         username: null,
// //         password: env('DATABASE_PASSWORD', null),
//         password: null
//       },
//       options: {
//         // authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
// //         ssl: true,
//       },
//     },
//   },
// });


module.exports = () => (
  {
    "defaultConnection": "default",
    "connections": {
      "default": {
        "connector": "mongoose",
        "settings": {
              "uri": "mongodb://vatsalgarg2000:admin@cluster0-shard-00-00.kmsbc.mongodb.net:27017,cluster0-shard-00-01.kmsbc.mongodb.net:27017,cluster0-shard-00-02.kmsbc.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xk68vt-shard-0&authSource=admin&retryWrites=true&w=majority"
        },
        "options": {
          "ssl": true
        }
      }
    }
  }
)
