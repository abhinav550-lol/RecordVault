import { Sequelize } from "sequelize";

const sequelize = new Sequelize('recordvaultdb', 'root', 'Mainbhagwanhun@13', {
	host: 'localhost',
	dialect: 'mysql'
});

export default sequelize;

