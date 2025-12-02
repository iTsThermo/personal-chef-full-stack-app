import type { Ingredient, Recipe } from "@monorepo/utils";
import { fetchIngredients } from "../ingredients/service";

import { openai } from "@ai-sdk/openai";
import { ModelMessage } from "ai";
import dotenv from "dotenv";
dotenv.config();
import { generateObject } from "ai";
import { z } from "zod";
import { prisma } from "../config/db";

export async function fetchRecipesFromDB(user_id: string): Promise<Recipe[]> {
  try {
    const ingredients: Ingredient[] = await fetchIngredients(user_id);
    const savedRecipes: Recipe[] = await fetchSavedRecipes(user_id);
    const recipes: Recipe[] = await generateRecipes(ingredients, savedRecipes);
    return recipes;
  } catch (err: any) {
    return err;
  }
}

async function generateRecipes(ingredients: Ingredient[], savedRecipes: Recipe[]): Promise<Recipe[]> {
  const messages: ModelMessage[] = [
    {
      role: "system",
      content: `You are a culinary chef that wants to create dishes with what you have in your inventory. 
        You will be giving recommendations for what dishes you can cook. 
        I want a lot of detail on tbe steps and Ingredients. 
        You can be more descriptive with the ingredients so that they make sure sense. 
        Here are the ingredients you have on hand, infer the type of food/amount if the measurements aren't given properly. 
        If there is enough ingredients to create a dessert, I want you to include it if possible. 
        There should only be a max of 1 dessert item, and the rest should be entres. 
        Aim to generate a total of 3 dishes. 
        You want to create healthy dishes.
        Don't generate the same / similar recipes that are already saved.`,
    },
  ];

  const stringifyIngredients = JSON.stringify(ingredients);
  const stringifySavedRecipes = JSON.stringify(savedRecipes);

  messages.push({ role: "user", content: stringifyIngredients });
  messages.push({ role: "user", content: stringifySavedRecipes });

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      recipes: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          ingredients: z.array(
            z.object({ name: z.string(), amount: z.string() })
          ),
          steps: z.array(z.string()),
        })
      ),
    }),
    prompt: messages,
  });

  return object.recipes;
}

export async function newRecipe(recipe: Recipe) {
  try {
    if (recipe.user_id === undefined) {
      return;
    }

    const res = await prisma.recipes.create({
      data: {
        user_id: recipe.user_id,
        name: recipe.name,
        description: recipe.description,
        steps: recipe.steps,
        ingredients: JSON.stringify(recipe.ingredients),
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchSavedRecipes(user_id: string): Promise<Recipe[]> {
  try {
    const res = await prisma.recipes.findMany({
      where: {
        user_id: user_id,
      },
    });

    return res.map(transformRecipe);
  } catch (error: any) {
    return error;
  }
}

function transformRecipe(recipe: any): Recipe {
  return {
    id: recipe.id,
    user_id: recipe.user_id,
    name: recipe.name,
    description: recipe.description,
    ingredients:
      typeof recipe.ingredients === "string"
        ? JSON.parse(recipe.ingredients)
        : recipe.ingredients,
    steps:
      typeof recipe.steps === "string"
        ? JSON.parse(recipe.steps)
        : recipe.steps,
  };
}

export async function deleteRecipe(user_id: string, id: string) {
  try {
    const parsedIntId: number = parseInt(id);

    const res = await prisma.recipes.delete({
      where: {
        user_id: user_id,
        id: parsedIntId,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
