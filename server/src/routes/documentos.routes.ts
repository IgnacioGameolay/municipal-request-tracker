import { Router } from "express";
import multer from "multer";
import path from "node:path";
import {
  descargarDocumentoSolicitud,
  eliminarDocumentoSolicitud,
  listarDocumentosSolicitud,
  subirDocumentoSolicitud,
} from "../controllers/documentos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  MAX_DOCUMENTO_SIZE_BYTES,
  MIME_TYPES_PERMITIDOS,
} from "../models/documento.model.js";
import { errorResponse } from "../utils/apiResponse.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const nombreSeguro = `${Date.now()}-${Math.round(
      Math.random() * 1_000_000_000,
    )}${extension}`;

    callback(null, nombreSeguro);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_DOCUMENTO_SIZE_BYTES,
  },
  fileFilter: (req, file, callback) => {
  const tiposPermitidos = MIME_TYPES_PERMITIDOS as readonly string[];

  const extensionesPermitidas = [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".doc",
    ".docx",
  ];

  // Extrae la extensión real del archivo (ej: ".pdf")
  const extension = path.extname(file.originalname).toLowerCase();

  // Revisa si el MIME type o la extensión coinciden
  const mimePermitido = tiposPermitidos.includes(file.mimetype);
  const extensionPermitida = extensionesPermitidas.includes(extension);

  // Si NINGUNO de los dos es válido, rechaza el archivo
  if (!mimePermitido && !extensionPermitida) {
    return callback(
      new Error(
        "Formato no permitido. Solo se aceptan PDF, JPG, PNG, DOC y DOCX."
      )
    );
  }

  // Si todo está bien, lo deja pasar
  callback(null, true);
  }
});

router.use(authMiddleware);

router.get("/:id/documentos", listarDocumentosSolicitud);

router.post(
  "/:id/documentos",
  (req, res, next) => {
    upload.single("documento")(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return errorResponse(
            res,
            400,
            "El documento supera el tamaño máximo permitido de 15 MB",
            [{ field: "documento", code: "max_file_size" }],
          );
        }

        return errorResponse(res, 400, error.message, [
          { field: "documento", code: error.code },
        ]);
      }

      if (error instanceof Error) {
        return errorResponse(res, 400, error.message, [
          { field: "documento", code: "invalid_file" },
        ]);
      }

      next();
    });
  },
  subirDocumentoSolicitud,
);

router.get("/:id/documentos/:documentoId/descargar", descargarDocumentoSolicitud);

router.delete("/:id/documentos/:documentoId", eliminarDocumentoSolicitud);

export default router;