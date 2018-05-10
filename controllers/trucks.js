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
    console.log(newtruck);
    // saves record to data base
    newtruck.save();
    Truck.find({}).exec((err, trucks) => res.json(trucks));
    // newtruck.save((err, saved) => {
    //   // Returns the saved truck
    //   // after a successful save
    //   Truck.find({ _id: saved._id })
    //     // .populate("jobs")
    //     .exec((err, truck) => res.json(truck));
    // });
  }
};

module.exports = truckController;
