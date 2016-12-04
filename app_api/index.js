
const articleRoutes = require('./article');
const userRoutes = require('./user');

module.exports = function(app) {

	app.use('/api/article', articleRoutes);
	app.use('/api/user', userRoutes);

}
