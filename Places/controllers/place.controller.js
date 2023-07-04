const db = require("../db");
const Category = db.Category;
const Place = db.Place

exports.create = async (req, res) => {
    if (!req.body.name || !req.body.logo || !req.body.category || !req.body.address) {
        res.status(400).json({ error: "Provide a name, logo, category and address" });
        return;
    }

    const place = {
        name: req.body.name,
        categoryId: req.body.category,
        logo: req.body.logo,
        address: req.body.address,
    };

    Place.create(place)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({ error: "Something went wrong" });
        });
};

exports.findAll = (req, res) => {
    Place.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Something went wrong" });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id
    Place.findByPk(id, {
        include: Category
    }).then(place => {
        if (!place)
            res.json({ error: "Place not found" })
        else
            res.json(place)
    }).catch(err => {
        res.status(500).json({ error: "Something went wrong" })
    })
};

exports.update = (req, res) => {
    const id = req.params.id;

    Place.update(req.body, { where: { id: id } })
        .then(() => {
            res.json({ message: "Place is updated succesfully." })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong" });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Place.destroy({ where: { id: id } })
        .then(() => {
            res.json({ message: "Place deleted succesfully" })
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong" });
        });
};