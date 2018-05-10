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
    Job.find(
      { date: requestBody.date },
      "startTime totalHours truck date",
      function(err, jobs) {
        if (err) return err;

        Truck.find({}, "_id", function(err, trucks) {
          let allTrucks = {};
          trucks.forEach(truck => {
            allTrucks[truck._id] = "available";
          });
          return allTrucks;
        })

          .then(allTrucks => {
            let newJobStartTime = requestBody.startTime;
            let newJobEndTime = newJobStartTime + requestBody.totalHours;
            jobs.forEach(job => {
              let existingJobEndTime = job.startTime + job.totalHours;
              if (
                (newJobStartTime >= job.startTime &&
                  newJobStartTime < existingJobEndTime) ||
                (newJobEndTime > job.startTime &&
                  newJobEndTime < existingJobEndTime) ||
                (newJobStartTime <= job.startTime &&
                  newJobEndTime >= existingJobEndTime)
              ) {
                if (allTrucks[job.truck] === "available") {
                  allTrucks[job.truck] = "booked";
                }
              }
            });
            return allTrucks;
          })

          .then(allTrucks => {
            return Object.keys(allTrucks).filter(
              truckId => allTrucks[truckId] === "available"
            );
          })
          .then(truck => {
            console.log(truck);
          });
      }
    );

    // Creates a new record from a submitted form
    var newjob = new Job({
      name: requestBody.name,
      date: requestBody.date,
      startTime: requestBody.startTime,
      totalHours: requestBody.totalHours,
      truck: requestBody.truck,
      created_at: Date.now()
    });
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
