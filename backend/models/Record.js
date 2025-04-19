import { DataTypes } from 'sequelize';
import sequelize from '../config/SQLconnection.js';
import AppError from '../error/AppError.js';

const Record = sequelize.define('Record', {
	searchName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	semester: {
		type: DataTypes.STRING,
		allowNull: false
	},
	examName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false
	},
	marks: {
		type: DataTypes.JSON,
		allowNull: true,
		set(value) {
			if (!Array.isArray(value)) 	throw new AppError(400, 'Marks must be an array.');
			for (const item of value) {
				if (typeof item.subject !== 'string') 	throw new AppError(400, 'Each mark must have a subject of type string.');
				if (item.grade !== undefined && typeof item.grade !== 'string') throw new AppError(400, 'If provided, grade must be a string.');
				if (item.score !== undefined && typeof item.score !== 'number') throw new AppError(400, 'If provided, score must be a number.');
				if (item.credit !== undefined && typeof item.credit !== 'number') throw new AppError(400, 'If provided, credit must be a number.');
			}
			this.setDataValue('marks', value);
		}
	},
	description: {
		type: DataTypes.STRING,
	},
	userId : {
		type : DataTypes.UUID,
		allowNull : false	
	}
}, {
	timestamps: true,
	tableName: 'records'
});

Record.sync();
export default Record;



