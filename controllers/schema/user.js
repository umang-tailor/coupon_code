module.exports = `
scalar Date

 type user{
    email:String
    password:String
    role:userRole
 }

enum userRole{
    ADMIN
    USER
}

input createUser {    
    email:String
    password:String
    role:userRole
 }
input updateUser{
    email:String
    password:String
    role:userRole
 }
input LoginInput {
    email: String
    password: String
  }
  type LoginResponse {
    token: String!
  }

 type responseUser {
     token:String
     status: Boolean
     statusCode: Int
     message: String
     data: [user]
  
 }
 type Mutation {
    registerUser(data:createUser) : responseUser! 
    login(data: LoginInput): LoginResponse
 }
`;
