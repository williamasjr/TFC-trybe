module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('matches', {
      id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        home_team_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        home_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        away_team_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        away_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        in_progress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
