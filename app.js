const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;
// async IIFE
(async () => {
	// Sync all tables. (force: true) will create the table everytime I run npm start
	await db.sequelize.sync({ force: true });
  	try {
    	const movieInstances = await Promise.all([
	      Movie.create({
	        title: 'Toy Story',
		    runtime: 81,
		    releaseDate: '1995-11-22',
		    isAvailableOnVHS: true,
	      }),
	      Movie.create({
	        title: 'The Incredibles',
		    runtime: 115,
		    releaseDate: '2004-04-14',
		    isAvailableOnVHS: true,
	      }),
	    ]);
	    const moviesJSON = movieInstances.map(movie => movie.toJSON());
	    console.log(moviesJSON);

	    const person = await Person.create({
	    	firstName: "Casper",
	    	lastName: "Panduro"
	    });
	    console.log(person.toJSON());

	    const movie3 = await Movie.build({
	      title: 'Toy Story 3',
	      runtime: 103,
	      releaseDate: '2010-06-18',
	      isAvailableOnVHS: false,
	    });
	    await movie3.save();
	    console.log(movie3.toJSON());

	    const movieById = await Movie.findByPk(2);
    	console.log(movieById.toJSON());

    	const movieByRuntime = await Movie.findOne({ where: { runtime: 103 } });
    	console.log(movieByRuntime.toJSON());


    	const movies = await Movie.findAll({
	      attributes: ['id', 'title'],
	      where: {
	        releaseDate: {
	          [Op.gte]: '2004-01-01' // greater than or equal to the date
	        },
	        runtime: {
	          [Op.gt]: 95, // greater than 95
	        },
	      },
	      order: [['id', 'DESC']] // IDs in descending order
	    });
	    console.log( movies.map(movie => movie.toJSON()) );

	    const toyStory3 = await Movie.findByPk(3);
	    await toyStory3.update({
	      isAvailableOnVHS: true,
	    });

	    console.log( toyStory3.get({ plain: true }) );

    	
  	} catch (error) {
    	if (error.name === 'SequelizeValidationError') {
	      const errors = error.errors.map(err => err.message);
	      console.error('Validation errors: ', errors);
	    } else {
	    	throw error;
	    }
  	}
})();


