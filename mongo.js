const { Schema, connect, model } = require('mongoose');

const MONGO_URI =
	'mongodb+srv://<user>:<password>@<host>/<db-name>';

const dbConnection = async () => {
	await connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	});
	console.log('connected to mongoDB successfuly');
};

const user = new Schema(
	{
		email: { type: String, requied: true, lowercase: true, unique: true },
		name: String,
		status: {
			type: String,
			default: 'active'
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

module.exports = {
	dbConnection,
	userModel: model('user', user)
};
