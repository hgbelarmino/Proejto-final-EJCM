const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads");
    },

    filename(req, file, callback) {
        const nome = 
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);

        callback(null, nome);
    }
});

const fileFilter = (req, file, callback) => {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    ];

    if (!tiposPermitidos.includes(file.mimetype)) {
        return callback(
            new Error("Tipo de arquivo não permitido.")
        );
    }

    callback(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;