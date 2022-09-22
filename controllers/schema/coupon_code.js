module.exports = `
directive @isAuthorized on FIELD | FIELD_DEFINITION
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION
directive @auth(
   requires: userRole = ADMIN,
 ) on OBJECT | FIELD_DEFINITION

scalar Date
 type CouponCode {
    coupon_code_id : Int
    expiry_date : Date
    discount_value:Int
    percentage_discount:Int
    flat_discount:Int
    status: Int 
 }

 input createCode {    
    coupon_code_id : Int
    expiry_date : Date
    discount_value:Int
    percentage_discount:Int
    flat_discount:Int
    created_by:Int
    
    
 }
 input updateCode {
    coupon_code_id : Int
    expiry_date : Date
    discount_value:Int
    percentage_discount:Int
    flat_discount:Int
    updated_by: Int
    
 }
 input EnableDisableCode {
    coupon_code_id : Int!
    operation: Int
 }
 input InputPagination {
    page: Int
    limit: Int
}

 type responseGetAllCouponCode {
     status: Boolean
     statusCode: Int
     message: String
     rowsCount: Int
     data: [CouponCode]
  
 }
 type responseGetCouponCodeById {
     status: Boolean
     
     message: String
     data: CouponCode
 }

 type Query {
    getAllCouponCode(data: InputPagination) : responseGetAllCouponCode
 }
 type Mutation {
    createCouponCode(data: createCode) : responseGetCouponCodeById @isAuthorized  @auth(requires: ADMIN)
    updateCouponCode(data: updateCode) : responseGetCouponCodeById @isAuthorized
    enableDisableCouponCode(data: EnableDisableCode) : responseGetCouponCodeById @isAuthorized
    deleteCouponCode(coupon_code_id : Int!) : responseGetCouponCodeById @isAuthorized
 }
`;
