const constants = require("../../config/constants");
const bcrypt = require("bcryptjs");
const token = require("../../config/secret");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const dbStatus = require("../../config/common");
const models = require("../../models");
const { enable, disable, disabled } = require("../../config/common");

module.exports = {
  Mutation: {
    createCouponCode: async (parent, args, ctx) => {
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", args.data);
      // console.log("createCouponCode function start");
      console.log("!!!!!!!!!!!!!!!!!!!!!!!11", ctx.userData.id);
      try {
        let couponObject = {
          coupon_code_id: args.data.coupon_code_id,
          user_id: ctx.userData.id,
          expiry_date: new Date(),
          discount_value: args.data.discount_value,
          percentage_discount: args.data.percentage_discount,
          flat_discount: args.data.flat_discount,
        };

        let coupon = await models.coupon_code.create(couponObject);

        return {
          status: constants.success_code,
          message: "successfully created",
          data: coupon,
        };
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    },
    enableDisableCouponCode: async (_, args, ctx) => {
      // console.log(" !!!!!!!!!!!!!!!!!!!!!!!!!!!:>> ");
      try {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!1findCode :>> ", args.data);
        const findCode = await models.coupon_code.findOne({
          where: {
            coupon_code_id: args.data.coupon_code_id,
          },
        });
        // console.log("$$$$$$$$findCode:>> ", findCode);
        if (!findCode) {
          return {
            message: "internal_server_error",
            data: null,
          };
        }

        // if data is enable and you're trying to enable again
        if (
          findCode.status === enable &&
          args.data.coupon_code_id === disable
        ) {
          return {
            message: "coupon_code already_enabled",
          };
        }
        // console.log("object :>> ", args.data.coupon_code_id === enable);

        // if data is disable and you're trying to disable it again
        if (
          findCode.status === enable &&
          args.data.coupon_code_id === disabled
        ) {
          return {
            message: "coupon_code already_disabled",
          };
        }
        // console.log(findCode.status);

        const enableDisableCode = await models.coupon_code.update(
          {
            status: args.data.operation,
          },
          { where: { coupon_code_id: args.data.coupon_code_id } }
        );
        
        // console.log("enableDisableCode :>> ", enableDisableCode);
        // console.log("''''''''''''''", args.data.operation === disable);
        // if data is enabled successfully
        if (args.data.operation === enable) {
          return {
            status: constants.success_code,
            message: "coupon_code enabled",
            data: enableDisableCode,
          };
        }

        // if data is disable successfully
        if (args.data.operation === disabled) {
          return {
            status: constants.success_code,
            message: "coupon_code disabled",
          };
        }
      } catch (error) {
        console.log("error :>> ", error);
        throw "error";
      }
    },
  },
};
