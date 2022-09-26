module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
    },
  });
  users.associate = function (models) {
    users.hasMany(models.coupon_code, {
      foreignKey: "id",
      as: "coupon_code",
    });
  };
  return users;
};
