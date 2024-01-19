const User = require('../models/user-model');

const router = require('express').Router;
const route = router();

route.get('/', async (req, res) => {
	console.log(req.body);
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;

	try {
		const allData = 1;
		const doc = await User.find({})
			.skip((page - 1) * limit)
			.limit(limit);
		res.json({ msg: 'done', total: allData, doc });
	} catch (err) {
		res.status(501).json({ msg: 'got error' });
	}
});

route.get('/tot', async (req, res) => {
	try {
		const doc = await User.countDocuments({});
		res.json({ msg: 'done', total: Math.ceil(doc / 10) });
	} catch (err) {
		res.status(501).json({ msg: 'got error', err });
	}
});

route.post('/create', async (req, res) => {
	console.log(req.body);
	try {
		const user = new User(req.body);

		user.save();
		res.json({ msg: 'done', users: await User.find({}) });
	} catch (err) {
		res.status(501).json({ msg: 'got error' });
	}
});

route.patch('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const info = await User.updateOne({ _id: id }, { $set: req.body });
		res.json({ msg: 'done', info, users: await User.find({}) });
	} catch (err) {
		console.log(err);
		res.status(501).json({ msg: 'got error' });
	}
});

route.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const info = await User.deleteOne({ _id: id });
		res.json({ msg: 'done', info, users: await User.find({}) });
	} catch (err) {
		console.log(err);
		res.status(501).json({ msg: 'got error' });
	}
});
module.exports = route;
