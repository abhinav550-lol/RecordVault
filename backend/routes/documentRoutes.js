import express from 'express';
import documentController from '../controllers/DocumentController.js';
import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = express.Router();

//Create a new document
router.post('/', isLoggedIn, documentController.createDocument);

//Get all documents
router.get('/', isLoggedIn, documentController.getAllDocuments);

//Get a document by id
router.get('/:id', isLoggedIn, documentController.getDocumentById);

//Edit a document
router.put('/:id', isLoggedIn, documentController.editDocument);

//Delete a document
router.delete('/:id', isLoggedIn, documentController.deleteDocument);

export default router;