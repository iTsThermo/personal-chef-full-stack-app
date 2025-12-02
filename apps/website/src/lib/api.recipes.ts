import type { objectCreated, Recipe, StandardApiResponseRecipes } from "@monorepo/utils";
import { axiosClient } from "./client";

export async function deleteRecipeFromDB(
  data: Recipe,
  token: string
): Promise<objectCreated[] | any> {
  try {
    return await axiosClient.delete<Recipe[]>(
      `/recipe/delete-recipe/${data.user_id}/${data.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    throw new Error("Error");
  }
}

//
//  Recipes API
//

export async function getRecipes(user_id: string, token: string) {
  try {
    const response = await axiosClient.get<StandardApiResponseRecipes>(
      `/recipe/fetch-recipes`,
      {
        params: {
          user_id: user_id,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw new Error("Error");
  }
}

export async function saveRecipeToDB(
  data: Recipe,
  token: string
): Promise<objectCreated[] | any> {
  try {
    return await axiosClient.post<Recipe>("/recipe/save-recipe", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    throw new Error("Error");
  }
}

export async function getSavedRecipes(
  user_id: string,
  token: string
): Promise<Recipe[]> {
  try {
    const response = await axiosClient.get<StandardApiResponseRecipes>(
      `/recipe/fetch-saved-recipes`,
      {
        params: {
          user_id: user_id,
        },

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw new Error("Error");
  }
}
