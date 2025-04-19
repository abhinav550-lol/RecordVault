import express from 'express';
import recordController from '../controllers/RecordController.js';
import { isLoggedIn } from '../utils/isLoggedIn.js';

const router = express.Router();

//Create a new record
router.post('/', isLoggedIn, recordController.createRecord);

//Get all records
router.get('/', isLoggedIn, recordController.getAllRecords);

//Get records by exam name and semester
router.get('/sort', isLoggedIn, recordController.getRecordsByExamNameAndSemester);

//Get a record by id
router.get('/:id', isLoggedIn, recordController.getRecordById);

//Edit a record
router.put('/:id', isLoggedIn, recordController.editRecord);

//Delete a record
router.delete('/:id', isLoggedIn, recordController.deleteRecord);

export default router;