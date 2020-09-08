module.exports = {
  limits: {
    fileSize: 10000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image.'));
    }

    cb(undefined, true);
  }
};
