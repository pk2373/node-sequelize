const model = require('../model');

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
  ctx.response.set({
    'Access-Control-Allow-Origin': '*'
  });
  const body = ctx.request.body;
  if (!body.name){
    ctx.response.body = {
      msg: '姓名不存在'
    }
      return;
  }
  await User.create({
    name: body.name,
    gender: body.gender || 1,
    email: body.email || '1528853034939@garfield.pet',
    passwd: body.passwd.toString()
  });
  ctx.response.body = {
    status: 'ok',
  }
};

var fn_getUser = async (ctx, next) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*'
  });
  var users = await User.findAll({
/*    where: {
      name: 'Garfield'
    }*/
  });
  ctx.response.body = {
    data: users,
  }
};

module.exports = {
  'POST /signin': fn_signin,
  'GET /users': fn_getUser,
};