const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	class Person extends Sequelize.Model {}
	
	Person.init({
		id: {
			type: Sequelize.INTEGER,
	      	primaryKey: true,
	      	autoIncrement: true,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false, // disallow null
			validate: {
				notNull: {
					msg: '"firstName" cannot be null'
				},
				notEmpty: {
					msg: '"firstName" cannot be empty'
				}
			}
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false, // disallow null
			validate: {
				notNull: {
					msg: '"lastName" cannot be null'
				},
				notEmpty: {
					msg: '"lastName" cannot be empty'
				}
			}
		}
	}, {sequelize});

	return Person;
}