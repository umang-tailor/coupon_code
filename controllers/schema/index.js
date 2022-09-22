const { mergeTypeDefs } = require("@graphql-tools/merge");
const user = require("./user");

const coupon_code = require("./coupon_code");

const types = [user, coupon_code];

module.exports = mergeTypeDefs(types);
