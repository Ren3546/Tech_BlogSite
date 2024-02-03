// Import the necessary modules and routes
const router = require("express").Router();
// const apiRoutes = require("./api");
const homePageRoutes = require("./homeRoutes");
// Set up routes
// router.use("/api", apiRoutes);
router.use("/", homePageRoutes);
// Export the router
module.exports = router;
