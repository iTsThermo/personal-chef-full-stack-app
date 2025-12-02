import type { Ingredient } from "@monorepo/utils";
import { prisma } from "../config/db";

export async function newIngredient(ingredient: Ingredient) {
  try {
    if (!ingredient.user_id) {
      return;
    }
    const res = await prisma.ingredients.create({
      data: {
        user_id: ingredient.user_id,
        ingredient: ingredient.ingredient,
        quantity: ingredient.quantity,
        measurement: ingredient.measurement,
      },
    });
    return res;
  } catch (error) {
    console.log(error)
    return error;
  }
}

export async function fetchIngredients(user_id: string): Promise<Ingredient[]> {
  try {
    const res = await prisma.ingredients.findMany({
      where: {
        user_id: user_id,
      },
    });
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function updateIngredient(updatedIngredient: Ingredient) {
  try {
    const res = await prisma.ingredients.update({
      where: { 
        user_id: updatedIngredient.user_id,
        id: updatedIngredient.id
      },
      data: {
        ingredient: updatedIngredient.ingredient,
        measurement: updatedIngredient.measurement,
        quantity: updatedIngredient.quantity
      }
    })
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export async function deleteIngredient(user_id: string, id: string) {
  try {

    const parsedIntId: number = parseInt(id)

    const res = await prisma.ingredients.delete({
      where: { 
        user_id: user_id,
        id: parsedIntId
      }
    })
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}