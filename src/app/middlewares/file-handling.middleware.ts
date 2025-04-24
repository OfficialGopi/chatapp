import multer from "multer";
import path from "path";

class FileHandling {
  public upload: multer.Multer;
  constructor(path: string, maxSizeInMb: number) {
    // Middleware responsible to read form data and upload the File object to the mentioned path
    this.upload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          // This storage needs public/images folder in the root directory
          // Else it will throw an error saying cannot find path public/images
          cb(null, path);
        },
        // Store file in a .png/.jpeg/.jpg format instead of binary
        filename: function (req, file, cb) {
          let fileExtension = "";
          if (file.originalname.split(".").length > 1) {
            fileExtension = file.originalname.substring(
              file.originalname.lastIndexOf("."),
            );
          }
          const filenameWithoutExtension = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-")
            ?.split(".")[0];
          cb(
            null,
            filenameWithoutExtension +
              Date.now() +
              Math.ceil(Math.random() * 1e5) + // avoid rare name conflict
              fileExtension,
          );
        },
      }),
      limits: {
        fileSize: maxSizeInMb * 1024 * 1024,
      },
    });
  }
}

//TASK FILE HANDLING

const ExampleImageHandling = new FileHandling(
  path.join(path.resolve(), "/app/public/examples"),
  20,
);

export { ExampleImageHandling };
