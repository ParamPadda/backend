//main file for all api routes---

const router = require("express").Router();
//importing AuthRouter.js file  data here , where we get /login ,/signup
const authRoutes = require("./AuthRouter");
const adminRoutes = require("./AdminUsers");
const EmailRoutes = require("./EmailRoutes");
const CreateBlogRoutes = require("./CreateBlogRoutes");
const QuizRoute = require("./QuizRoute");
const BlogUserManage = require("./BlogUserManage");
const Badges = require("./Badges");

const DailyTask = require("./DailyTask");


//work of this file to look for  /auth then go to authRoutes that we  had required above
router.use("/auth", authRoutes);
router.use("/blogs", CreateBlogRoutes);
router.use("/admin", adminRoutes);
router.use("/email", EmailRoutes);
router.use("/quiz", QuizRoute);
router.use("/tasks", DailyTask);
router.use("/blog-users", BlogUserManage);
router.use("/badges", Badges);



router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;