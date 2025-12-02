import { Ingredient, ingredientSchema } from "@monorepo/utils";
import {
  deleteIngredient,
  fetchIngredients,
  newIngredient,
  updateIngredient,
} from "./service";
import { Response, Request, NextFunction } from "express";
import { z } from 'zod'
// import { errorHandler } from "../middleware/errorhandler";

export const addNewIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredientData: Ingredient = req.body;

    ingredientSchema.parse(ingredientData);

    await newIngredient(ingredientData);

    res.status(200).json({
      status: "Success",
      message: "Success creating ingredient",
    });
  } catch (err) {
    next(err);
  }
};

export const fetchAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.query.user_id;
    if (typeof user_id !== "string") {
      throw new Error("Wrong Type");
    }
    const ingredients: Ingredient[] = await fetchIngredients(user_id);

    // Zod validation for array format
    const ingredientSchemaArray = z.array(ingredientSchema);
    ingredientSchemaArray.parse(ingredients)

    res.status(200).json({
      status: "Success",
      data: ingredients,
    });
  } catch (err) {
    next(err);
  }
};

export const putIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredientData: Ingredient = req.body as unknown as Ingredient;

    ingredientSchema.parse(ingredientData)

    await updateIngredient(ingredientData);
    res.status(200).json({
      status: "Success",
      message: "Success updating ingredient",
    });
  } catch (err) {
    next(err);
  }
};

export const delIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id: string = req.params.user_id;
    const id: string = req.params.id;

    await deleteIngredient(user_id, id);
    res.status(200).json({
      status: "Success",
      message: "Success deleting ingredient",
    });
  } catch (err) {
    next(err);
  }
};
