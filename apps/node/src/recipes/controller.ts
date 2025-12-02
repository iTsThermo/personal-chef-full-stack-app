import { Recipe, RecipeSchema } from "@monorepo/utils";
import {
  deleteRecipe,
  fetchRecipesFromDB,
  fetchSavedRecipes,
  newRecipe,
} from "./service";
import { Response, Request, NextFunction } from "express";
import z from "zod";

export const fetchRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.query.user_id;
    if (typeof user_id !== "string") {
      throw new Error("Wrong Type");
    }
    const recipesObject: Recipe[] = await fetchRecipesFromDB(user_id);

    const RecipeSchemaArray = z.array(RecipeSchema);
    RecipeSchemaArray.parse(recipesObject);

    res.status(200).json({
      status: "Success",
      data: recipesObject,
    });
  } catch (err) {
    next(err);
  }
};

export const saveRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipeData: Recipe = req.body as unknown as Recipe;

    RecipeSchema.parse(recipeData)

    await newRecipe(recipeData);
    res.status(200).json({
      status: "Success",
      message: "Success saving recipe",
    });
  } catch (err) {
    next(err);
  }
};

export const fetchAllSavedRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.query.user_id;
    if (typeof user_id !== "string") {
      throw new Error("Wrong Type");
    }
    const recipes: Recipe[] = await fetchSavedRecipes(user_id);

    const recipeArray = z.array(RecipeSchema);
    recipeArray.parse(recipes)

    res.status(200).json({
      status: "Success",
      data: recipes,
    });
  } catch (err) {
    next(err);
  }
};

export const delRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id: string = req.params.user_id;
    const id: string = req.params.id;

    await deleteRecipe(user_id, id);
    res.status(200).json({
      status: "Success",
      message: "Success deleting recipe",
    });
  } catch (err) {
    next(err);
  }
};
