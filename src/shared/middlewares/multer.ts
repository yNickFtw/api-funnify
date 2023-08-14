import multer from "multer";

const storage = multer.memoryStorage();
const uploadThread = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    const allowedFormats = ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime'];

    if (!allowedFormats.includes(file.mimetype)) {
      return cb(new Error("Por favor, envie apenas imagens (png, jpg, jpeg) ou vídeos (mp4, mov)!"));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const uploadMiddleware = uploadThread.single("file"); 
export { uploadMiddleware };
