const { verify } = require('jsonwebtoken');
const jwtSecret = 'newsecret1234';

const authGuard = async (req, res, next) => {
	try {
		//check header for token
		const token = req.headers.token;

		if (!token) {
			throw Error('Please provide token');
		}
		// if token exists validate token
		const verifyRes = verify(token, jwtSecret);
		req['payload'] = {
			_id: verifyRes._id,
			email: verifyRes.email,
			name: verifyRes.name
		};
		next();
		// if invalid return forbidden
	} catch (error) {
		res.status(401).send({ error: error.message });
	}
};

module.exports = {
	authGuard
};
