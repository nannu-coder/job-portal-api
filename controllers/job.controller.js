const Job = require("../models/job.model");

exports.getJobs = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };

    const excludefield = ["fields"];

    excludefield.forEach((field) => delete queryObject[field]);

    const queries = {};

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    console.log(req.query.page);

    const result = await Job.find(queryObject)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields);

    const total = await Job.countDocuments(queryObject);
    const page = Math.ceil(total / queries.limit);

    res.status(200).json({
      status: "success",
      data: { total, page, result },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Job.find({ _id: id });
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const result = await Job.create(req.body);
    res.status(200).json({
      status: "Success",
      msg: "successfully created job",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Job.updateOne({ _id: id }, req.body, {
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      msg: "successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error.message,
    });
  }
};
