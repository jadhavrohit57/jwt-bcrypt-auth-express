const express = require('express');
const cors = require('cors');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const { dbConnection, userModel } = require('./mongo');
const { authGuard } = require('./middleware');
const app = express();

app.use(cors());
app.use(express.json());

const jwtSecret = 'newsecret1234';

app.get('/', (req, res) => {
	res.send('success');
});

// create user

app.post('/user', async (req, res) => {
	try {
		const body = req.body;

		body.password = await hash(body.password, 4);
		const userRes = await userModel.create(body);

		res.send(userRes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

app.post('/auth/login', async (req, res) => {
	try {
		const body = req.body;

		//find user with email
		const userInfo = await userModel.findOne({ email: body.email });
		if (!userInfo) {
			throw Error('email or password not found');
		}

		//check password
		const passCheck = await compare(body.password, userInfo.password);
		if (!passCheck) {
			throw Error('email or password not correct');
		}

		// genrate jwt token

		const jwtToken = sign(
			{ _id: userInfo._id, email: userInfo.email, name: userInfo.name, status: userInfo.status },
			jwtSecret,
			{
				/** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
				expiresIn: '1 day'
			}
		);
		res.send({ token: jwtToken });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

app.get('/user', authGuard, async (req, res) => {
	try {
		const userInfo = await userModel.findById(req.payload._id, { password: -1 });
		res.send(userInfo);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

(async () => {
	await dbConnection();

	app.listen(8080, () => {
		console.log('server listening on port ', 8080);
	});
})();
