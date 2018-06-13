const model = require('./model');

// model.sync(); //自动建表 清空表
let
    Pet = model.Pet,
    User = model.User;

(async () => {

    var user = await User.create({
        name: 'John',
        gender: 0,
        email: 'john-' + Date.now() + '@garfield.pet',
        passwd: 'hahaha'
    });

    await Pet.create({
        ownerId: user.id,
        name: 'Garfield',
        gender: 1,
        birth: '2007-07-07',
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


})();