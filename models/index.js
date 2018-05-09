const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const jobSchema = new Schema({
  name: String,
  date: Date,
  startTime: Number,
  totalHours: Number,
  truck: { type: ObjectId, ref: "Truck" },
  created_at: Date
});

const Job = model("Job", jobSchema);

const truckSchema = new Schema({
  id: ObjectId,
  name: String,
  startTime: Number,
  endTime: Number,
  jobs: [{ type: ObjectId, ref: "Job" }],
  created_at: Date // add default Data.now()
});

const Truck = model("Truck", truckSchema);

module.exports = {
  Truck,
  Job
};
