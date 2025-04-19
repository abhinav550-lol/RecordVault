import express from 'express'
const app = express();

//Packages
import sequelize from './config/SQLconnection.js'
import session from 'express-session'
import bodyParser from 'body-parser';
import errorMiddleware from './error/errorMiddleware.js'
import fileUpload from 'express-fileupload'

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))


//Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import recordRoutes from './routes/recordRoutes.js'
import documentRoutes from './routes/documentRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/record', recordRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/certificate', certificateRoutes);

//Error Middleware
app.use(errorMiddleware);

const startServer = async () => {
	await sequelize.authenticate()
		.then(() => {
			console.log('SQL Connected Successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});

	app.listen(3000, () => {
		console.log('Server is running on port 3000')
	})
};

startServer();