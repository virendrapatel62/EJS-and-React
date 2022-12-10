const userRouter = require("express").Router();

userRouter.get("/", (request, response) => {
  response.render("pages/users", { request, response });
});

module.exports = { userRouter };
