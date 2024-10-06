import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images');
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const allowerTypes = ['image/png', 'image/jpeg', 'image.jpg', 'image/webp'];

const fileFilter = function(req, file, cb){
    if(allowerTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const imageUpload = multer({
  storage,
  fileFilter
});

export default imageUpload;