const {
	hadleDelete,
	hadleIdUpdate,
	hadleCreate,
	getTotal,
	handlefindUser,
	handleGetUser,
} = require('../controller/user-controller');

const router = require('express').Router;
const route = router();

route.get('/', handleGetUser);

route.post('/search', handlefindUser);

route.get('/tot', getTotal);

route.post('/create', hadleCreate);

route.patch('/:id', hadleIdUpdate);

route.delete('/:id', hadleDelete);
module.exports = route;
