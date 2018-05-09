var Model = require("../models/index");
const { Truck, Job } = Model;

const jobController = {
  all(req, res) {
    // Returns all jobs
    Job.find({}).exec((err, jobs) => res.json(jobs));
  },
  create(req, res) {
    var requestBody = req.body;

    // helper function to find available truck

    // Creates a new record from a submitted form
    var newjob = new Job({
      name: requestBody.name,
      date: requestBody.date,
      startTime: requestBody.startTime,
      totalHours: requestBody.totalHours,
      truck: requestBody.truck,
      created_at: Date.now()
    });
    console.log(newjob);
    // saves record to data base
    newjob.save();
    Job.find({}).exec((err, jobs) => res.json(jobs));
    // newjob.save((err, saved) => {
    //   // Returns the saved truck
    //   // after a successful save
    //   Job.find({ _id: saved._id }).exec((err, job) => res.json(job));
    // });
  }
};

module.exports = jobController;
