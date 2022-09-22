const user = require("./user");

const coupon_code = require("./coupon_code");

const { mergeResolvers } = require("@graphql-tools/merge");

module.exports = mergeResolvers([user, coupon_code]);
