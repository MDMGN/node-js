import express from "express";
import { logger } from "./middlewares/logger.js";
import { todosRouter } from "./routes/todos.route.js";
import { todos } from "./data/todos.js";
import { homeRouter } from "./routes/home.route.js";
import authRouter from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import helmet from "helmet";
import cors from "cors";

const app = express();
const port = process.env.PORT;

//Midlewares
app.use(helmet());
// CORS
app.use(cors());
// Indicamos que vamos a usar Handlebars como motor de plantillas
app.set("view engine", "hbs");
// Indicamos la carpeta donde se encuentran las vistas
app.set("views", "./views");
// Middleware para indicar que vamos a usar archivos estáticos (CSS, JS, imágenes, etc.) desde la carpeta public
app.use(express.static("public"));
// Middleware para parsear el body de las peticiones
app.use(express.urlencoded({ extended: true }));
// Registramos un middleware con nuestro logger
app.use(logger);

// Rutas
// Registramos el router de tareas como middleware para la ruta /todos
app.use("/todos", authMiddleware, todosRouter);
// Registramos el router de autenticación como middleware para la ruta /auth
app.use("/auth", authRouter);

app.use("/", homeRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Iniciamos el servidor y escuchamos en el puerto indicado
app.listen(port, () => {
  console.log(`Arrancando servidor en localhost:${port}`);
});
