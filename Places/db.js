const Sequelize = require("sequelize");

const sequelize = new Sequelize('sqlite::memory:');


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

db.Category = require("./models/category.model.js")(sequelize, Sequelize);
db.Place = require("./models/place.model.js")(sequelize, Sequelize);

db.Category.hasMany(db.Place);
db.Place.belongsTo(db.Category, {
    foreignKey: "categoryId",
    targetKey: 'id',
});

module.exports = db;