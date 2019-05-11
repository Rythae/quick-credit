/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const verifyAdmin = (req, res, next) => {
	if(!req.user.isAdmin) {
		return res.status(403).send({
			status: 'failed',
			message: 'Unauthorised user',
		});
	}
	next();
};

export default verifyAdmin;
