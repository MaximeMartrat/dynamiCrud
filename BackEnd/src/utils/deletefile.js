const fs = require("fs");

const deleteFile = (res, modelName, tableName, id) => {
    fs.readFile('./src/models/' + modelName + '.json', (err, data) => {
        // si une erreur sur la lecture du fichier
        if (err) {
            res.status(500).json({
                message: "Une erreur est survenue lors de la lecture des données",
            });
        } else {
            // stocker les données existantes
            const existingData = JSON.parse(data);

            // Trouver l'index de l'élément à supprimer
            const dataIndex = existingData[tableName].findIndex((obj) => obj.id === parseInt(id));

            if (dataIndex === -1) {
                res.status(404).json({
                    message: "Aucun objet trouvé avec cet id",
                });
                return;
            }

            // Supprimer l'élément du tableNameau
            existingData[tableName].splice(dataIndex, 1);

            // Réécrire le fichier avec les données mises à jour (élément supprimé)
            fs.writeFile('./src/models/' + modelName + ".json", JSON.stringify(existingData, null, 2), (writeErr) => {
                // si il y a une erreur au moment de l'écriture
                if (writeErr) {
                    res.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture des données",
                    });
                } else {
                    res.status(200).json({
                        message: "Les données ont été supprimées avec succès",
                        [tableName]: existingData[tableName]
                    });
                }
            });
        }
    });
}

module.exports = deleteFile;
