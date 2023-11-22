const express = require('express')
const router = express.Router()
const crudController = require('../controller/crudController')

router.get('/:modelName/:tableName/:id', crudController.getById);
router.get('/:modelName/:tableName', crudController.getall); 
router.post('/:modelName/:tableName', crudController.create);
router.put('/:modelName/:tableName/:id', crudController.update);
router.delete('/:modelName/:tableName/:id', crudController.delete);

module.exports = router