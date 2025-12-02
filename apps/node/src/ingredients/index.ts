import express, { Router } from "express";
import { fetchAllIngredients, addNewIngredient, putIngredient, delIngredient } from "./controller";

const apiRouter: Router = express.Router();

apiRouter.post("/new-ingredient", addNewIngredient);
apiRouter.get("/fetch-ingredients", fetchAllIngredients);
apiRouter.put("/update-ingredient", putIngredient);
apiRouter.delete("/delete-ingredient/:user_id/:id", delIngredient);


export default apiRouter;