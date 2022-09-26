module.exports = (sequelize, DataTypes) => {
  const coupon_code = sequelize.define("coupon_code", {
    coupon_code_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    expiry_date: DataTypes.DATE,
    discount_value: DataTypes.BIGINT,
    percentage_discount: DataTypes.BIGINT,
    flat_discount: DataTypes.BIGINT,
    status: {
      type: DataTypes.ENUM("enable", "disabled"),
      defaultValue: "enable",
    },
  });
  coupon_code.associate = function (models) {
    coupon_code.belongsTo(models.users, {
      foreignKey: "id",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return coupon_code;
};
