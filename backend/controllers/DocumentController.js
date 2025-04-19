import Document from '../models/Document.js';
import AppError from '../error/AppError.js';
import wrapAsyncErrors from '../error/wrapAsyncErrors.js';
import { uploadFile, getUserFolder } from '../utils/uploadFiles.js';

const documentController = {};

//Create a new document
documentController.createDocument = wrapAsyncErrors(async (req, res, next) => {
    const { searchName, description } = req.body;
	
	if(!searchName || !description || !req.files){
		return next(new AppError(400, 'All fields are required'));
	}
	const {attachment} = req.files;
	
	const userFolder = getUserFolder(req.session.userId);
	const attachmentPath = uploadFile(attachment, userFolder);

    const document = await Document.create({ searchName, description, attachment: attachmentPath , userId : req.session.userId });

    return res.status(201).json({
        success: true,
        message: 'Document created successfully',
        document
    })
});

//Get all documents
documentController.getAllDocuments = wrapAsyncErrors(async (req, res, next) => {
    const documents = await Document.findAll({ where : { userId : req.session.userId } });
    return res.status(200).json({
        success: true,
        message: 'Documents fetched successfully',
        documents
    })
});

//Get a document by id
documentController.getDocumentById = wrapAsyncErrors(async (req, res, next) => {
    const document = await Document.findByPk(req.params.id);

	if(!document){
		return next(new AppError(404, 'Document not found'));
	}
	
    return res.status(200).json({
        success: true,
        message: 'Document fetched successfully',
        document
    })
});

//Edit a document
documentController.editDocument = wrapAsyncErrors(async (req, res, next) => {
	const document = await Document.findByPk(req.params.id);

	if(!document) return next(new AppError(404, 'Document not found'));
	if(document.userId !== req.session.userId)	return next(new AppError(403, 'You are not authorized to edit this document'));
	
	const { searchName, description } = req.body;

	if(!searchName || !description || !req.files){
		return next(new AppError(400, 'All fields are required'));
	}	
	const {attachment} = req.files;
	const userFolder = getUserFolder(req.session.userId);
	const attachmentPath = uploadFile(attachment, userFolder);


	await document.update({ searchName, description, attachment : attachmentPath });

	return res.status(200).json({
		success: true,
		message: 'Document updated successfully',
		document
	});
});

//Delete a document
documentController.deleteDocument = wrapAsyncErrors(async (req, res, next) => {
    const document = await Document.findByPk(req.params.id);

	if(!document){
		return next(new AppError(404, 'Document not found'));
	}

	if(document.userId !== req.session.userId){
		return next(new AppError(403, 'You are not authorized to delete this document'));
	}

	await document.destroy();

	return res.status(200).json({
		success: true,
		message: 'Document deleted successfully',
		document
	});
});


export default documentController;