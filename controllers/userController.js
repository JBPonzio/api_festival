const UserModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

// get all users
module.exports.getAll = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};

// get informations about user with id
module.exports.getUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("L'identifiant "+ req.params.id + " est inconnu.");
    }else {
        UserModel.findById(req.params.id, (err, docs) => {
            if (!err){
                res.send(docs);
            } else {
                res.status(400).json("Impossible de récupérer les données sur cet utilisateur." + err);
            }
        }).select("-password");
    }
}

module.exports.addUser = async (req, res) => {
    const {firstname, lastname, username, email, password, role} = req.body
    try{
        await UserModel.create({firstname, lastname, username, email, password, role });
    }catch (err){
        res.status(400).json("Un erreur est survenue" + err);
    }
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    username: req.body.username,
                    events: req.body.events,
                    password: req.body.password,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("L'identifiant "+ req.params.id + " est inconnu.");

    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Utilisateur supprimé. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};