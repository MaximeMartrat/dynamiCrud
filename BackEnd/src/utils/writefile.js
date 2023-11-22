const fs = require("fs");

const writeFile = (req, res, modelName, tableName) => {
    fs.readFile('./src/models/' + modelName + '.json', (err, data) => {
        // si une erreur sur la lecture du fichier
        if (err) {
            res.status(500).json({
                message: "Une erreur est survenue lors de la lecture des données",
            });
        } else {
            // stocker les données existante
            const existingData = JSON.parse(data);
            const id = existingData[tableName].filter(item => item.id);
            const maxId = Math.max(...id.map(item => item.id), 0);
            const newData = {
                id: maxId + 1,
                ...req.body
            }
            // rajouter ma donnée à moi
            existingData[tableName].push(newData);
            // je vais reécrire le fichier avec les nouvelles données
            fs.writeFile('./src/models/' + modelName + ".json", JSON.stringify(existingData, null, 2), (writeErr) => {
                // si il ya une erreur au moment de l'écriture
                if (writeErr) {
                    res.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture des données",
                    });
                } else {
                    res.status(200).json({
                        message: "Les données ont été ajouté avec succès",
                        [tableName]: existingData[tableName]
                    });
                }
            });
        }
    });
}

module.exports = writeFile;