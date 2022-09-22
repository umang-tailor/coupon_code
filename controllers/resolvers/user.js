const constants = require("../../config/constants");
const bcrypt = require("bcryptjs");
const token = require("../../config/secret");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const models = require("../../models");

module.exports = {
  Mutation: {
    registerUser: async (parent, args, ctx) => {
      // console.log(args)

      try {
        console.log("registerUser function start");
        const { email, password, userRole, role } = args.data;
        console.log("first_name :>> ", args.data);
        if (!email || !password || !role) {
          throw "Please provide all Data";
        }

        let existUserData = await models.users.findOne({
          where: {
            email: email,
          },
        });

        if (existUserData) {
          throw "User with this email is already registered with us";
        }

        let secret = token;
        var hashedPassword = await bcrypt.hash(args.data.password, 8);

        let createObject = {
          email: email,
          password: hashedPassword,
          role: role,
        };

        let user = await models.users.create(createObject);

        let updatedUserData = await models.users.findOne({
          where: {
            id: user.id,
          },
        });

        let authToken = jwt.sign({ id: user.id, role: "Users" }, secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        console.log("authToken printed here", authToken);

        return {
          status: constants.success_code,
          message: "successfully created",
          data: updatedUserData,
          token: authToken,
        };
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      }
    },

  }
}  

//   Query: {
//     listUsers: async (parent, args, ctx) => {
//       console.log("Start");
//       try {
//         let result = await models.users.findAndCountAll({
//           order: [["createdAt", "DESC"]],
//           offset: parseInt(args.skip),
//           limit: parseInt(args.limit),
//         });
//         // console.log("result :>> ", result);
//         return {
//           status: constants.success_code,
//           message: "successfully listed",
//           data: result.rows,
//           total: result.count,
//         };
//       } catch (error) {
//         throw error;
//       }
//     },
//   },
