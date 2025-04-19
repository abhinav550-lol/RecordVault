const baseFolder = '../store'; 
import path from 'path'
import AppError from '../error/AppError.js'
import fs from 'fs'

export const getUserFolder = (id) => {
  return path.join(baseFolder, id)
}

export const uploadSingleFile = (file, userFolder) => {
	const uploadPath = path.join(userFolder, file.name);

	if(!fs.existsSync(userFolder)) {
		fs.mkdirSync(userFolder, { recursive: true });
	}

  file.mv(uploadPath, function (err) {
    if (err) {
      throw new AppError(500, `An Error Occurred while file upload. Error: ${err}`);
    }
  });

  return uploadPath;   
};

export const uploadFile = (files, userFolder) => {

  if ('name' in files) {
    // Single file
    return [uploadSingleFile(files, userFolder)];
  } else {
    // Multiple files
    return Object.values(files).map(file => uploadSingleFile(file, userFolder));
  }
};

