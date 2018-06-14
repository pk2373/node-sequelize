const model = require('../model');
const {APIError} = require('../rest');

let
    User = model.User;

/*(async () => {
  await User.create({
    name: 'John',
    gender: 0,
    email: 'john-' + Date.now() + '@garfield.pet',
    passwd: 'hahaha'
  });

  var pets = await Pet.findAll({
    where: {
      name: 'Garfield'
    }
  });
  for (let p of pets) {
    p.name = 2;
    await p.save();
  }


})();*/

var fn_signin = async (ctx, next) => {
    const body = ctx.request.body;
    if (!body.name) {
        throw new APIError('error', '姓名不存在');
    }
    var newUser = await User.create({
        name: body.name,
        gender: body.gender || 1,
        passwd: body.passwd,
    });
    ctx.rest(newUser)
};

var fn_getUser = async (ctx, next) => {
    var users = await User.findAll();
    ctx.rest(users)
};

var fn_deleteUser = async (ctx, next) => {
    var id = ctx.params.id
    var users = await User.findAll({
        where: {
            id: id
        }
    });
    if (users && users.length){
        users[0].destroy();
        ctx.rest(users[0]);
    }else {
        throw new APIError('error', '找不到此数据');
    }

};

module.exports = {
    'POST /signin': fn_signin,
    'GET /users': fn_getUser,
    'DELETE /users/:id': fn_deleteUser,
};