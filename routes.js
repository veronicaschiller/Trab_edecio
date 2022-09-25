import { Router, json } from "express";
import {
  insulinaAdd,
  insulinaDelete,
  insulinaIndex,
  insuPesq,
  insuUpdate,
} from "./Controller/insulinaController.js";
import {
  insertUsuario,
  userDelete,
  userPesq,
  userUpdate,
  usuarioIndex,
} from "./Controller/usuarioController.js";

const routes = Router();

routes.use(json());

routes
  .get("/usuario", usuarioIndex)
  .post("/usuario", insertUsuario)
  .put("/usuario/:id", userUpdate)
  .delete("/usuario/:id", userDelete)
  .get("/usuario/pesq/:Nome", userPesq);

routes
  .get("/insulina", insulinaIndex)
  .post("/insulina", insulinaAdd)
  .put("/insulina/:id", insuUpdate)
  .delete("/insulina/:id", insulinaDelete)
  .get("/insulina/pesq/:id", insuPesq);

export default routes;
