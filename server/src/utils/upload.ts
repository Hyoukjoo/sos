import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    let array = file.originalname.split('.');
    array[0] = array[0] + '_';
    array[1] = '.' + array[1];
    array.splice(1, 0, Date.now().toString());
    const result = array.join('');
    cb(null, result);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;
