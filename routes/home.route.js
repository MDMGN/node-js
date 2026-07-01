import { Router } from "express";
import { todos } from "../data/todos.js";

export const homeRouter = Router();

homeRouter.get("/", (request, response) => {
  //Respondemos con HTML
  response.render("home", { name: "Darren", todos });
});
