const constants = require("../../config/constants");
const bcrypt = require("bcryptjs");
const token = require("../../config/secret");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../../models");

module.exports = {
  Mutation: {
    createCouponCode: async (parent, args, ctx) => {
      // console.log(args)

      try {
        console.log("createCouponCode function start");
        const {
          expiry_date,
          discount_value,
          percentage_discount,
          flat_discount,
        } = args.data;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:>> ", args.data);
        // if (
        //   !expiry_date ||
        //   !discount_value ||
        //   !percentage_discount ||
        //   !flat_discount
        // ) {
        //   throw "Please provide all Data";
        // }

        let couponObject = {
          expiry_date: new Date(),
          discount_value: discount_value,
          percentage_discount: percentage_discount,
          flat_discount: flat_discount,
          created_by: ctx.userData.id,
        };

        let user = await models.coupon_code.create(couponObject);

        let updatedCouponData = await models.coupon_code.findOne({
          where: {
            id: user.id,
          },
        });

        return {
          status: constants.success_code,
          message: "successfully created",
          data: updatedCouponData,
        };
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    },
  },
};
