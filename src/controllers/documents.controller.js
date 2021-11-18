const express = require("express");
const router = express.Router();
const upload = require("../upload");

const auth = require("../middleware/auth");
const {
  readDocuments,
  updateStatusDocuments,
  uploadDocuments,
} = require("../models/documents");

logger.debug("Rota /documents");
router.get("/:id", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Documents']
       #swagger.description = 'Endpoint to Dashboard' */

    /*	#swagger.parameters['id'] = {
          in: 'query',
          description: 'id user',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Buscando documento por id: ${req.params.id}`);
    const result = await readDocuments(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Documents']
       #swagger.description = 'Endpoint to Dashboard' */

    /*	#swagger.parameters['id'] = {
          in: 'query',
          description: 'id user',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Edição de documento`);
    logger.info(req.body);
    const result = await updateStatusDocuments(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/upload", upload.array("file", 10), async (req, res, next) => {
  try {
    /* #swagger.tags = ['Documents']
       #swagger.description = 'Endpoint to Dashboard' */

    /*	#swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['multFiles'] = {
              in: 'formData',
              required: true,
              description: 'Some description...',
              collectionFormat: 'multi',
              items: { type: ['file'] }
        } */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Signup to CPF information.',
          required: true,
          schema: { $ref: "#/definitions/DocumentsUpload" }
  } */
    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Update de documento`);
    logger.info(req.body);
    if (req.files.length > 0) {
      const result = await uploadDocuments(req);
      res.send(result);
    } else {
      throw Error("FILE_MISSING");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
