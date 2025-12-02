import express, { Router } from "express";
import { delRecipe, fetchAllSavedRecipes, fetchRecipes, saveRecipe } from "./controller";

const recipeRouter: Router = express.Router();

recipeRouter.get("/fetch-recipes", fetchRecipes);
recipeRouter.post("/save-recipe", saveRecipe);
recipeRouter.get("/fetch-saved-recipes", fetchAllSavedRecipes);
recipeRouter.delete("/delete-recipe/:user_id/:id", delRecipe);

export default recipeRouter;