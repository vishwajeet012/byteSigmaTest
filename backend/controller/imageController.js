const multer = require('multer');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

exports.handleUpload = upload.single('image');
// Controller function for uploading images
exports.uploadImage =  (req, res) => {
    console.log("Image uploaded successfully");
    res.send('Image uploaded successfully');
};

// Controller function for fetching list of uploaded images
exports.getImages = (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching images');
        } else {
            const images = files.map(file => {
                return {
                    filename: file,
                    uploadDate: fs.statSync(`uploads/${file}`).birthtime
                };
            });
            res.json(images);
        }
    });
};
