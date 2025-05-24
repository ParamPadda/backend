//main file for all routes-- 

const router = require("express").Router();

const createError = require("http-errors");
//importing api di index.js  file da data here which contains all api routes , where we get /auth route
const apiRoutes = require("./api/index.js");

router.use("/api", apiRoutes);

router.use("/api", (req, res, next) => {
  next(
    createError.NotFound("The route you are trying to access does not exist.")
  );
});


// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

module.exports = router;