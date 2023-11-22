const fs = require("fs");
const readFile = require('../utils/readfile');
const writeFile = require('../utils/writefile');
const updateFile = require('../utils/updatefile');
const deleteFile = require('../utils/deletefile');


exports.getall = (req, res) => {
    readFile(res, req.params.modelName, req.params.tableName);
}

exports.getById = (req, res) => {
    readFile(res, req.params.modelName, req.params.tableName, req.params.id);
}

exports.create = (req, res) => { 
    writeFile(req, res, req.params.modelName, req.params.tableName);
}

exports.update = (req, res) => { 
    updateFile(req, res, req.params.modelName, req.params.tableName, req.params.id);
}

exports.delete = (req, res) => { 
    deleteFile(res, req.params.modelName, req.params.tableName, req.params.id);
}
