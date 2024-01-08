const mongoose = require('mongoose');
module.exports = async (server) => {
	try {
		console.log('t=========', process.env.MONGO_URL);
		await mongoose.connect(
			'mongodb+srv://umeshsavaliya777:rkxakaVlLwDIpOQb@test.khurlpx.mongodb.net/'
		);
		console.log('mongo db connected ...');
		server.listen(5000, () => {
			console.log('server runing on port ' + 5000);
		});
	} catch (err) {
		console.log('mongo connection failed', err);
		process.exit(1);
	}
};
