import express from 'express';
import controller from '../controllers/Denuncia';
// import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/createdenuncia',controller.createDenuncia);
router.get('/readdenuncia/:denunciaId', controller.readDenuncia);
router.get('/readall', controller.readAll);
router.put('/updatedenuncia/:denunciaId', controller.updateDenuncia);
router.delete('/deletedenuncia/:denunciaId', controller.deleteDenuncia);

export = router;