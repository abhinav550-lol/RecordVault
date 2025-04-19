
export default function errorMiddleware(err, req, res, next) {
  let { name, message = "Internal Server Error", status = 500 } = err;

  if (name === "ValidationError") {
    message = "Mongoose Validation Failed";
	console.log(err)
    status = 400; 
  }

  res.status(status).json({
    success: false,
    message,
  });
}
