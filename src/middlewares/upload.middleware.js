const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "src/uploads");
    },

    filename(req, file, cb) {
        const nome = 
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);
        cb(null, nome);
    }
});

const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        "image/jpeg",
        "image/png",
        "image/gif",
    ];

    if (!tiposPermitidos.includes(file.mimetype)) {
        return cb(new Error("Tipo de arquivo não permitido."));
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;