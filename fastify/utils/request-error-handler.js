exports.errorHandler = error => {
  let result;
  if (error.response) {
    result = { status: error.response.status, data: error.response.data };
  } else if (error.request) {
    result = {
      status: error.request.status,
      data: error.request.data,
      message: "Network failure"
    };
  } else {
    result = { message: error.message };
  }
  return result;
};
