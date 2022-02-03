const EventModel = require("../models/eventModel");
const ObjectId = require("mongoose").Types.ObjectId;

// get all events
module.exports.getAll = async (req, res) => {
    const events = await EventModel.find();
    res.status(200).json(events);
};

// get informations about event with id
module.exports.getEvent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("L'identifiant "+ req.params.id + " est inconnu.");
    }else {
        EventModel.findById(req.params.id, (err, docs) => {
            if (!err){
                res.send(docs);
            } else {
                res.status(400).json("Impossible de récupérer les données sur cet évènement." + err);
            }
        })
    }
}

module.exports.addEvent = async (req, res) => {
    const newEvent = new EventModel({
        artist: req.body.artist,
        date: req.body.date,
        description: req.body.description,
        status: req.body.status
    });
    await newEvent.save((error, docs) => {
        if (!error) {
            res.send(docs);
        } else {
            console.log("Une erreur est survenue:" + error);
        }
    });
};

module.exports.updateEvent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await EventModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    artist: req.body.artist,
                    date: req.body.date,
                    description: req.body.description,
                    status: req.body.status
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteEvent = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("L'identifiant "+ req.params.id + " est inconnu.");

    try {
        await EventModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Evènement supprimé. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};