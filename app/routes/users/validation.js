/**
 * Created by vladtomsa on 27/09/2018
 */
module.exports = {
  createUser: {
      type: 'object',
      properties: {
          username: {
              type: 'string'
          },
          email: {
              type: 'string'
          },
      },
      required: ['username', 'email'],
  },
  confirmUser: {
      type: 'object',
      properties: {
          token: {
              type: 'string'
          },
          password: {
              type: 'string'
          },
          address: {
              type: 'string',
          }
      },
      required: ['token', 'password', 'address'],
  }
};