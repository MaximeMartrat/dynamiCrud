const fs = require("fs");

const readFile = (res, modelName, tableName, id) => {
    fs.readFile('./src/models/' + modelName +'.json', (err, data) => {
        if (err) {
            res.status(500).json({
                message: "Une erreur lors de la lecture des données",
                error: err,
            })
        } else {
            const jsonData = JSON.parse(data);
            if (id) {
                const dataById = jsonData[tableName].find((obj) => obj.id === parseInt(id));
                if (dataById) {
                    res.status(200).json(dataById);
                } else {
                    res.status(404).json({
                        message: "Aucun objet trouvé avec cet id",
                    })
                }
            } else {
                res.status(200).json(jsonData[tableName]);
            }
        }
    })
};

module.exports = readFile;