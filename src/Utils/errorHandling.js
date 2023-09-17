// error handling

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function asyncHandler(fun) {
  return (req, res, next) => {
    fun(req, res, next).catch(err => {
      next(err)
    })
  }
}

export const globalErrorHandel = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: err.message, statusCode: err.statusCode })
}