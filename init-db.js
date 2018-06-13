/*require('babel-core/register')({
    presets: ['stage-3']
});*/


const model = require('./model');
model.sync(); //自动建表 清空表


setTimeout(() => {
    console.log('init db ok.');
    process.exit(0);
}, 2000);
