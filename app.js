const db = require('./db');
const { Movie } = db.models;
// async IIFE
(async () => {
	// Sync all tables. (force: true) will create the table everytime I run npm start
	await db.sequelize.sync({ force: true });
  	try {
    	const movieInstances = await Promise.all([
	      Movie.create({
	        title: 'Toy Story'
	      }),
	      Movie.create({
	        title: 'The Incredibles'
	      }),
	    ]);
	    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    	console.log(moviesJSON);
  	} catch (error) {
    	console.error('Error connecting to the database: ', error);
  	}
})();


