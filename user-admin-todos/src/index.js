const express = require("express");
const session = require("express-session");
const { createConnection } = require("./db");
const { authRouter } = require("./routers/auth");
const { todoRouter } = require("./routers/todo");
const { userRouter } = require("./routers/user");
const app = express();

app.use(
  session({
    secret: "secrert#232@#!@#",
  })
);
const port = 3000;

app.use(express.urlencoded());

app.set("view engine", "ejs");

createConnection();

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
