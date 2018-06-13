const db = require('../db');

module.exports = db.defineModel('users', {
    email: db.STRING(100),
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});
