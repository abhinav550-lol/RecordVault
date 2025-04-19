import { DataTypes } from 'sequelize';
import sequelize from '../config/SQLconnection.js';

const Documents = sequelize.define('Documents', {
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
	}
}, {
	timestamps : true,
	tableName : 'documents'
});

Documents.sync();
export default Documents;
