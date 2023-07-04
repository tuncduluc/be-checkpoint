const db = require("../db");
const Category = db.Category;
const Place = db.Place

exports.create = (req, res) => {
    if (!req.body.name || !req.body.icon) {
        res.status(400).json({ error: "Provide a name and an icon" });
        return;
    }

    const category = {
        name: req.body.name,
        icon: req.body.icon,
    };

    Category.create(category)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({ error: "Something went wrong" });
        });
};

exports.findAll = (req, res) => {
    console.log("here")
    Category.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Something went wrong" });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id
    Category.findByPk(id, {
        include: Place
    }).then(category => {
        if (!category)
            res.json({ error: "Category not found" })
        else
            res.json(category)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, { where: { id: id } })
        .then(() => {
            res.json({ message: "Category is updated succesfully." })
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong" });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({ where: { id: id } })
        .then(() => {
            res.json({ message: "Category deleted succesfully" })
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong" });
        });
};