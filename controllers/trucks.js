var Model = require("../models/index");
const { Truck } = Model;

const truckController = {
  all(req, res) {
    // Returns all trucks
    Truck.find({}).exec((err, trucks) => res.json(trucks));
  },
  create(req, res) {
    var requestBody = req.body;

    // Creates a new record from a submitted form
    var newtruck = new Truck({
      name: requestBody.name,
      startTime: requestBody.startTime,
      endTime: requestBody.endTime,
      created_at: Date.now()
    });
    // saves record to data base and returns json of new truck object
    newtruck
      .save()
      .then(truck => res.json(truck))
      .catch(err => res.json(err));
  }
};

module.exports = truckController;
