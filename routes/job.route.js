const router = require("express").Router();
const {
  getJobs,
  createJob,
  getSingleProduct,
  updateJob,
} = require("../controllers/job.controller");

router.get("/", getJobs);
router.post("/", createJob);
router.route("/:id").get(getSingleProduct).patch(updateJob);

module.exports = router;
