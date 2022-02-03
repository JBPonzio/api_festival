const ArtistModel = require("../models/artistModel");
const ObjectId = require("mongoose").Types.ObjectId;

// get all artists
module.exports.getAll = async (req, res) => {
    const artists = await ArtistModel.find();
    res.status(200).json(artists);
};

// get informations about artist with id
module.exports.getArtist = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("L'identifiant "+ req.params.id + " est inconnu.");
    }else {
        ArtistModel.findById(req.params.id, (err, docs) => {
            if (!err){
                res.send(docs);
            } else {
                res.status(400).json("Impossible de récupérer les données sur cet artiste." + err);
            }
        });
    }
}

module.exports.addArtist = async (req, res) => {
    const newArtist = new ArtistModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        name: req.body.name,
        description: req.body.description
    });
    await newArtist.save((error, docs) => {
        if (!error) {
            res.send(docs);
        } else {
            console.log("Une erreur est survenue:" + error);
        }
    });
};

module.exports.updateArtist = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await ArtistModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    events: req.body.events
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteArtist = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("L'identifiant "+ req.params.id + " est inconnu.");

    try {
        await ArtistModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Artiste supprimé. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};