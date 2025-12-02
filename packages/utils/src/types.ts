import { type RefObject } from "react";
import { z } from "zod";

export const ingredientSchema = z.object({
  user_id: z.string().optional(),
  id: z.number().optional(),
  ingredient: z.string().max(20),
  quantity: z.number().gt(0),
  measurement: z.string().or(z.null()),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

const objectCreatedSchema = z.object({
  status: z.string(),
  message: z.string(),
});

export type objectCreated = z.infer<typeof objectCreatedSchema>;


export const formIdSchema = z.object({
  FormId: z.custom<RefObject<string>>(),
  Item: z.optional(ingredientSchema)
});

export type FormId = z.infer<typeof formIdSchema>;

export const RecipeSchema = z.object({
  user_id: z.string().optional(),
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string()
    })
  ),
  steps: z.array(z.string()),
});

export type Recipe = z.infer<typeof RecipeSchema>

export const StandardApiResponseSchema = <T extends z.ZodTypeAny>(
  dataType: T
) =>
  z.object({
    status: z.string(),
    data: dataType,
  });

export const RecipesResponseSchema = StandardApiResponseSchema(
  z.array(RecipeSchema)
);

export const IngredientsResponseSchema = StandardApiResponseSchema(
  z.array(ingredientSchema)
);

export type StandardApiResponseRecipes = z.infer<typeof RecipesResponseSchema>
export type StandardApiResponseIngredients = z.infer<typeof IngredientsResponseSchema>

