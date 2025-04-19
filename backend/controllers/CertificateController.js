import Certificate from '../models/Certificate.js';
import AppError from '../error/AppError.js';
import wrapAsyncErrors from '../error/wrapAsyncErrors.js';
import { uploadFile, getUserFolder } from '../utils/uploadFiles.js';

const certificateController = {};

//Create a new Certificate
certificateController.createCertificate = wrapAsyncErrors(async (req, res, next) => {
    const { searchName, description , type } = req.body;
	
	if(!searchName || !description || !req.files || !type){
		return next(new AppError(400, 'All fields are required'));
	}

	const {attachment} = req.files;

	const userFolder = getUserFolder(req.session.userId);
	const attachmentPath = uploadFile(attachment, userFolder);

    const certificate = await Certificate.create({ searchName, description, attachment: attachmentPath , type , userId : req.session.userId });

    return res.status(201).json({
        success: true,
        message: 'Certificate created successfully',
		certificate
    })
});

//Get all documents
certificateController.getAllCertificates = wrapAsyncErrors(async (req, res, next) => {
    const certificates = await Certificate.findAll({ where : { userId : req.session.userId } });
    return res.status(200).json({
        success: true,
        message: 'Certificates fetched successfully',
        certificates
    })
});

//Get a document by id
certificateController.getCertificateById = wrapAsyncErrors(async (req, res, next) => {
    const certificate = await Certificate.findByPk(req.params.id);

	if(!certificate){
		return next(new AppError(404, 'Certificate not found'));
	}
	
    return res.status(200).json({
        success: true,
        message: 'Certificate fetched successfully',
        certificate
    })
});

//Edit a document
certificateController.editCertificate = wrapAsyncErrors(async (req, res, next) => {
    const { searchName, description, type } = req.body;
	
	const certificate = await Certificate.findByPk(req.params.id);
	if(!certificate) return next(new AppError(404, 'Certificate not found'));
	if(!searchName || !description || !req.files || !type)	return next(new AppError(400, 'All fields are required'));
		
	const {attachment} = req.files;
	const userFolder = getUserFolder(req.session.userId);
	const attachmentPath = uploadFile(attachment, userFolder);

	if(certificate.userId !== req.session.userId){
		return next(new AppError(403, 'You are not authorized to edit this certificate'));
	}		

	await certificate.update({ searchName, description, attachment : attachmentPath , type });

	return res.status(200).json({
		success: true,
		message: 'Certificate updated successfully',
		certificate
	});
});

//Delete a Certificate
certificateController.deleteCertificate = wrapAsyncErrors(async (req, res, next) => {
    const certificate = await Certificate.findByPk(req.params.id);

	if(!certificate){
		return next(new AppError(404, 'Certificate not found'));
	}

	if(certificate.userId !== req.session.userId){
		return next(new AppError(403, 'You are not authorized to delete this certificate'));
	}

	await certificate.destroy();

	return res.status(200).json({
		success: true,
		message: 'Certificate deleted successfully',
		certificate
	});
});


export default certificateController;