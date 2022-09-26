module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      "coupon_codes",
      "user_id",
      Sequelize.BIGINT
    );
  },
};
