const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

//disk storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, buffer) {
      if (err) return cb(err);
      const uniqueSuffix = buffer.toString("hex"); // ✅ define it here
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    });
  },
});

const upload = multer({ storage: storage });

// export upload variable
module.exports = upload;
