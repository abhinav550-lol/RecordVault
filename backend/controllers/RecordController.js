import Record from '../models/Record.js';
import AppError from '../error/AppError.js';
import wrapAsyncErrors from '../error/wrapAsyncErrors.js';

const recordController = {};


/*
Marks is of the form of: 
[	
	{
		subject : "Maths",
		grade : "A",
		score : 95,
		credit : 3
	},
		{
		subject : "Physics",
		grade : "A",
		score : 95,
		credit : 3
	}
]
*/


//Create a new Record
recordController.createRecord = wrapAsyncErrors(async (req, res, next) => {
	const { searchName, description, examName,semester , marks } = req.body;

	if(!searchName || !examName || !marks || !semester){
		return next(new AppError(400, 'All fields are required'));
	}

	const record = await Record.create({ searchName, description, examName,semester , marks : JSON.parse(marks) , userId : req.session.userId });

	return res.status(201).json({
		success: true,
		message: 'Record created successfully',
		record
	});	
});

//Edit a record
recordController.editRecord = wrapAsyncErrors(async (req, res, next) => {
	const { searchName, description, examName,semester , marks } = req.body;

	if(!searchName || !examName || !marks || !semester){
		return next(new AppError(400, 'All fields are required'));
	}

	const record = await Record.findByPk(req.params.id);

	if(!record){
		return next(new AppError(404, 'Record not found'));
	}	

	await record.update({ searchName, description, examName,semester , marks  : JSON.parse(marks)});

	return res.status(200).json({
		success: true,
		message: 'Record updated successfully',
		record
	});
});


//Get all records
recordController.getAllRecords = wrapAsyncErrors(async (req, res, next) => {
	const records = await Record.findAll({ where : { userId : req.session.userId } });

	return res.status(200).json({
		success: true,
		message: 'Records fetched successfully',
		records
	});
});

//Get a record by id
recordController.getRecordById = wrapAsyncErrors(async (req, res, next) => {
	const record = await Record.findByPk(req.params.id);

	if(!record){
		return next(new AppError(404, 'Record not found'));
	}
	
	return res.status(200).json({
		success: true,
		message: 'Record fetched successfully',
		record
	});
});


//Delete a record
recordController.deleteRecord = wrapAsyncErrors(async (req, res, next) => {
	const record = await Record.findByPk(req.params.id);

	if(!record){
		return next(new AppError(404, 'Record not found'));
	}

	if(record.userId !== req.session.userId){
		return next(new AppError(403, 'You are not authorized to delete this record'));
	}

	await record.destroy();

	return res.status(200).json({
		success: true,
		message: 'Record deleted successfully',
		record
	});
});


//Get all records by exam name and semester	
recordController.getRecordsByExamNameAndSemester = wrapAsyncErrors(async (req, res, next) => {
	const { examName, semester } = req.body;

	if(!examName || !semester){
		return next(new AppError(400, 'All fields are required'));
	}

	const records = await Record.findAll({ where : { examName, semester , userId : req.session.userId } });

	return res.status(200).json({
		success: true,
		message: 'Records fetched successfully',
		records
	});
});

export default recordController;