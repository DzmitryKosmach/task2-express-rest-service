const User = require('./user.model');

const USERS = [
  new User({
    name: 'Ivan',
    login: 'ivi',
    password: 'T35t_P@55w0rd',
  }),
  new User({
    name: 'Ivan2',
    login: 'ivi2',
    password: 'T35t_P@55w0rd',
  }),
];

module.exports = { USERS };
