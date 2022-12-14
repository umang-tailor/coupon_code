var app = {
  APP_NAME: "coupon",
  success_code: 200,
  forbidden_code: 403,
  bad_request_code: 400,
  server_error_code: 500,
  unauthorized_code: 401,
  token_expired_code: 401,

  server_error: "Oops! Something went wrong",
  token_expired: "Your token is Invalid/expired. Please login again",
  insufficient_parameters: "Insufficient parameters have been passed",
  unauthorize_access: "Unauthorize access",
  unauthorized_url: "You are unauthorized user to access this url",
};

module.exports = app;
