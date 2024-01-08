const router = require('express').Router;
const route = router();
route.post('/create', (req, res) => {
	console.log(req.body);
	res.json({ msg: 'done' });
});

module.exports = route;
