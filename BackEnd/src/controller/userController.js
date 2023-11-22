const fs = require("fs");

const users = './models/user.json';

const readFile = (filePath, callback) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

const writeFile = (filePath, data, callback) => {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

const createUser = (req, res) => {
    readFile(users, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        }

        const existingData = JSON.parse(data);
        const maxId = existingData.reduce((max, user) => (
            user.id > max ? user.id : max
        ))
        const newUser = {
            id: maxId + 1,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        existingData.push(newUser);

        writeFile(users, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({
                    message: "Erreur d'écriture",
                    error: writeErr
                });
            }

            res.status(200).json({
                message: "Données ajoutées",
                users: existingData
            });
        });
    });
};

const getAllUser = (req, res) => {
    readFile(users, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        }

        const existingData = JSON.parse(data);
        res.status(201).json(existingData);
    });
};

const getUserById = (req, res) => {
    const id = Number(req.params.id);

    readFile(users, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        }

        const existingData = JSON.parse(data);
        const user = existingData.find(user => user.id === id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(201).json(user);
    });
};

const updateUserById = (req, res) => {
    const id = Number(req.params.id);

    readFile(users, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        }

        const existingData = JSON.parse(data);
        const index = existingData.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).send('User not found');
        }

        const updatedUser = {
            id: existingData.users[index].id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        existingData[index] = updatedUser;

        writeFile(users, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({
                    message: "Erreur d'écriture",
                    error: writeErr
                });
            }

            res.status(200).json({
                message: "Données mises à jour",
                users: existingData
            });
        });
    });
};

const deleteUserById = (req, res) => {
    const id = Number(req.params.id);

    readFile(users, (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur de lecture",
                error: err
            });
        }

        const existingData = JSON.parse(data);
        const index = existingData.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).send('User not found');
        } else {
            existingData.splice(index, 1);

            writeFile(users, JSON.stringify(existingData, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({
                        message: "Erreur d'écriture",
                        error: writeErr
                    });
                }

                res.status(200).json({
                    message: "Utilisateur bien effacé",
                    users: existingData
                });
            });
        }
    });
};

module.exports = { createUser, getAllUser, getUserById, updateUserById, deleteUserById };
