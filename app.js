const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

var Pet = sequelize.define('pet', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT
}, {
  timestamps: false
});

var now = Date.now();

//创建
/*(async () => {
  var dog = await Pet.create({
    id: 'd-' + now,
    name: 'Odie',
    gender: false,
    birth: '2008-08-08',
    createdAt: now,
    updatedAt: now,
    version: 0
  });
  console.log('created: ' + JSON.stringify(dog));
})();*/


//查询




const queryFromSomewhere = async () => {
  let pets = await Pet.findAll({
    where: {
      name: 'Odie'
    }
  });
  console.log(`find ${pets.length} pets:`);
  let p;
  for (let p2 of pets) {
    p = p2;
    // console.log(JSON.stringify(p));
  }
  return p;
}

//更新
(async () => {
  var p = await queryFromSomewhere();
  p.gender = true;
  p.updatedAt = Date.now();
  p.version ++;
  await p.save();
})();
