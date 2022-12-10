const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));
// app.set('views' , path.join(__dirname , 'views'))

let counterValue = 0;
app.get("/counter", (_, response) => {
  response.render("counterApp/index", { counterValue });
});

app.get(["/counter/minus", "/counter/plus"], (request, response) => {
  if (request.url.includes("minus")) counterValue--;
  else counterValue++;
  response.redirect("/counter");
});

// app.get("/counter/minus", (_, response) => {
//   counterValue--;
//   response.redirect("/counter");
// });

// app.get("/counter/plus", (_, response) => {
//   counterValue++;
//   response.redirect("/counter");
// });

app.get("/", (request, response) => {
  const context = {
    student: {
      marks: [23, 45, 76, 87, 89],
      name: request.query.name,
      age: 24,
      address: "Jabalpur",
    },
  };
  response.render("pages/index", context);
});

const todos = [
  {
    title: "Learn JavaScript",
    id: Date.now() + 1,
  },
  {
    title: "Learn React",
    id: Date.now() + 2,
  },
  {
    title: "Learn EJS",
    id: Date.now() + 3,
  },
];

app.get("/todos", (request, response) => {
  const context = {
    todos,
  };
  response.render("todoApp/pages/todos", context);
});

app.get("/create-todo", (request, response) => {
  response.render("todoApp/pages/create-todo");
});

app.post("/create-todo", (request, response) => {
  const { title } = request.body;
  todos.push({
    title,
    id: Date.now(),
  });
  const context = {
    todos,
  };
  response.render("todoApp/pages/todos", context);
});

app.post("/todos/delete", (request, response) => {
  const { id } = request.body;

  const index = todos.findIndex((todo) => todo.id === +id);
  todos.splice(index, 1);

  response.redirect("/todos");
});

app.listen(3000, () => {
  console.log("App is running");
});
