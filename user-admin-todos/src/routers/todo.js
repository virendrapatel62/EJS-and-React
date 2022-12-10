const todoRouter = require("express").Router();

todoRouter.get("/", (request, response) => {
  response.render("pages/todos", { request, response });
});

module.exports = { todoRouter };
