import { DataTypes } from 'sequelize';
import sequelize from '../config/SQLconnection.js';

const User = sequelize.define('User', {
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	email : {
		type : DataTypes.STRING,
		allowNull : false,
		unique : true
	},
	password : {
		type : DataTypes.STRING,
		allowNull : false
	},
	phoneNo : {
		type : DataTypes.STRING,
		allowNull : false
	},
	id : {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey : true,
		allowNull : false
	},
	graduationYear : {
		type : DataTypes.INTEGER,
	},
	branch : {
		type : DataTypes.STRING,
	}
}, {
	timestamps : true,
	tableName : 'users'
});

User.sync();
export default User;
