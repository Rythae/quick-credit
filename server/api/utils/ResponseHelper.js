
class ResponseHelper {
  static success(res, status, data){
    return res.status(status).json({
      status,
      data,
    });
  }

  static error(res, status, error){
    return res.status(status).json({
      status,
      error,
    });
  }
}

export default ResponseHelper;