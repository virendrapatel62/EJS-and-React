const { User } = require("../models/user");

const authRouter = require("express").Router();

authRouter.get("/register", (request, response) => {
  response.render("pages/register", { request, response });
});

authRouter.post("/register", (request, response) => {
  const user = request.body;
  User.create(user)
    .then((user) => {
      console.log(user);
      response.redirect("/login");
    })
    .catch((error) => {
      response.render("pages/register", { request, response, error });
    });
});

authRouter.get("/logout", (request, response) => {
  request.session.destroy();
  response.redirect("/login");
});

authRouter.get("/login", (request, response) => {
  response.render("pages/login", { request, response });
});

authRouter.post("/login", (request, response) => {
  const { username, password } = request.body;

  User.findOne({
    username,
    password,
  }).then((user) => {
    console.log({ user });
    if (!user) {
      const context = {
        request,
        response,
        error: { message: "invalid username or password" },
      };
      response.render("pages/login", context);
      return;
    }
    request.session.user = user;
    response.redirect("/todos");
  });
});

module.exports = { authRouter };
