import { DataTypes } from 'sequelize';
import sequelize from '../config/SQLconnection.js';

const Certificate = sequelize.define('Certificate', {
	searchName : {
		type : DataTypes.STRING,
		allowNull : false
	},
	id : {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey : true,
		allowNull : false
	},
	description : {
		type : DataTypes.STRING,
	},
	attachment : {
		type : DataTypes.ARRAY(DataTypes.STRING),
		allowNull : false
	},
	userId : {
		type : DataTypes.UUID,
		allowNull : false	
	},
	type : {
		type : DataTypes.ENUM,
		values : ['Certificate', 'Achievement'],
		allowNull : false	
	}
}, {
	timestamps : true,
	tableName : 'certificates'
});

Certificate.sync();
export default Certificate;



