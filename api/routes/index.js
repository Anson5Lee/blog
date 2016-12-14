const articleRoutes = require('../article');
const userRoutes = require('../user');
const adminRoutes = require('../admin');

module.exports = function(app) {

	app.use('/api/article', articleRoutes);
	app.use('/api/user', userRoutes);
	app.use('/api/admin', adminRoutes);

}
