var Model = require("../models/index");
const { Truck, Job } = Model;

const jobController = {
  all(req, res) {
    // Returns all jobs
    Job.find({}).exec((err, jobs) => res.json(jobs));
  },

  // Create new job after checking if truck is available
  create(req, res) {
    var requestBody = req.body;

    // First, find and return all jobs booked on that date
    Job.find({ date: requestBody.date }, "startTime totalHours truck date")
    .then(jobs => {
      // Find and return all current trucks mapped as available
      Truck.find({}, "_id startTime endTime")
        .then(trucks => {
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
              if (allTrucks[job.truck] == "available") {
                allTrucks[job.truck] = "booked";
              }
            }
          });
          console.log(allTrucks);
          return allTrucks;
        })

        //  return the first available truck
        .then(allTrucks => {
          return Object.keys(allTrucks).find(
            truckId => allTrucks[truckId] === "available"
          );
        })

        // books new job with available truck
        .then(truck => {
          var newjob = new Job({
            name: requestBody.name,
            date: requestBody.date,
            startTime: requestBody.startTime,
            totalHours: requestBody.totalHours,
            truck: truck,
            created_at: Date.now()
          });

          // saves record to data base
          newjob.save().then(saved => {
            // Returns the saved truck
            // after a successful save
            Job.find({ _id: saved._id }).exec((err, job) => res.json(job));
          });
        });
    });
  }
};

module.exports = jobController;
