module.exports = (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
      
        name: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        logo: { type: Sequelize.STRING },

    });

    return Place;
};