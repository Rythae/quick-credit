/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const verifyUser = (req, res, next) => {
	if(req.user.id !== Number(req.params.userId)) {
		return res.status(403).send({
			status: 'failed',
			message: 'Unauthorised user',
		});
	}
	next();
};

export default verifyUser;
