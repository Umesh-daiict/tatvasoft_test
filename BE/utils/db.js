const mongoose = require('mongoose');
module.exports = async (server) => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('mongo db connected ...');
		server.listen(5000, () => {
			console.log('server runing on port ' + 5000);
		});
	} catch (err) {
		console.log('mongo connection failed', err);
		process.exit(1);
	}
};
