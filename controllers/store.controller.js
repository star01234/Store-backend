const Store = require("../models/store.model")

// Create and Save a New Store
exports.create = async (req, res) => {
  const { name, adminId, address, lat, lng } = req.body;

  if (!name || !adminId || !address || !lat || !lng) {  
    return res.status(400).send({
      message: "All fields (name, adminId, address, lat, lng) must be provided!",
    });
  }

  // Check if the Store already exists
  await Store.findOne({ where: { name: name } }).then((foundStore) => {
    if (foundStore) {
      return res.status(400).send({
        message: "Store already exists!",
      });
    }

    // Create a New Store
    const newStore = {
      name: name,
      adminId: adminId,
      address: address,
      lat: lat,
      lng: lng
    };
    
    Store.create(newStore)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occurred creating the Store.",
        });
      });
  });
};

// Get all Stores
exports.getAll = async (req, res) => {
  await Store.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something error occurred retrieving Stores.",
      });
    });
};

// Get a Store by ID
exports.getById = async (req, res) => {
  const id = req.params.id;

  await Store.findByPk(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Not found Store with id " + id });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving the Store.",
      });
    });
};

// Update a Store
exports.update = async (req, res) => {
  const id = req.params.id;

  await Store.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Store was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Store with id=" +
            id +
            ". Maybe Store was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred updating the Store.",
      });
    });
};

// Delete a Store
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Store.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Store was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Store with id " + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred deleting the Store.",
      });
    });
};



