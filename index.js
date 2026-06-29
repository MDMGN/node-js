import express from "express";

const app = express();
const port = process.env.PORT;

let todos = [
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
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
// Registramos un middleware con nuestro logger
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(new Date().toDateString());
    console.log(
      `${req.originalUrl}  [${req.method}][${res.statusCode}]  (${duration} ms)\n\r`,
    );
  });

  next();
});

// Rutas
app.get("/", (request, response) => {
  //Respondemos con HTML
  response.render("home", { name: "Darren", todos });
});

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.get("/:id", (req, res) => {
  res.send(`ID: ${req.params.id}`);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === Number(req.params.id));

  if (todo) {
    return res.status(200).json(todo);
  }

  return res.status(404).json({
    success: false,
    message: "Tarea no encontrada",
  });
});

app.post("/todos/create", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
  };
  // Agregar una nueva tarea a la lista
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    data: newTodo,
  });
});

app.delete("/todos/:id", (req, res) => {
  const found = todos.findIndex((todo) => todo.id === Number(req.params.id));
  // Si no existe, devolvemos el mensaje de error
  if (found === -1) {
    return res.status(404).json({
      success: false,
      message: "Tarea no encontrada",
    });
  }
  // Eliminamos de la referencia de todos el elemento por su índice
  todos = todos.slice(found, 1);
  // Devolvemos la respuesta con el cambios en todos
  return res.status(200).json({
    success: true,
    data: todos,
  });
});

app.listen(port, () => {
  console.log(`Arrancando servidor en localhost:${port}`);
});
