import express from 'express';
import certificateController from '../controllers/CertificateController.js';
import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = express.Router();

//Create a new certificate
router.post('/', isLoggedIn, certificateController.createCertificate);

//Get all certificates
router.get('/', isLoggedIn, certificateController.getAllCertificates);

//Get a certificate by id
router.get('/:id', isLoggedIn, certificateController.getCertificateById);

//Edit a certificate
router.put('/:id', isLoggedIn, certificateController.editCertificate);

//Delete a certificate
router.delete('/:id', isLoggedIn, certificateController.deleteCertificate);

export default router;