import express from "express";

const app = express();
const port = process.env.PORT;

const todos = [
  {
    id: 1,
    title: "Tarea 1",
  },
  {
    id: 2,
    title: "Tarea 2",
  },
  {
    id: 3,
    title: "Tarea 3",
  },
];
//Midlewares
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  console.log("GET [200] /");
  //Respondemos con HTML
  response.render("home", { name: "Darren", todos });
});

app.get("/:id", (req, res) => {
  res.send(`ID: ${req.params.id}`);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === Number(req.params.id));

  if (todo) {
    res.send(`Todo: ${todo.title}`);
  } else {
    res.send("Tarea no encontrada");
  }
});

app.post("/todos/create", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
  };
  // Agregar una nueva tarea a la lista
  todos.push(newTodo);
  //Responder con nuestra plantilla home.hbs y pasar la lista actualizada
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Arrancando servidor en localhost:${port}`);
});
