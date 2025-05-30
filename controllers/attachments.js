import crypto from "node:crypto";
import path from "node:path";

export const uploadAttachment = (req, res, next) => {
  const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });

  const upload = multer({ storage });
};
