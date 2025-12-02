// Import axiosClient
import { axiosClient } from "./client";

// Types
import {
  type Ingredient,
  type objectCreated,
  type StandardApiResponseIngredients,
} from "@monorepo/utils";

//
//  Ingredients API
//

export async function getIngredientsFromDB(
  user_id: string,
  token: string
): Promise<Ingredient[]> {
  try {
    const response = await axiosClient.get<StandardApiResponseIngredients>(
      `/ingredients/fetch-ingredients`,
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

export async function addIngredientsToDB(
  data: Ingredient,
  token: string
): Promise<objectCreated[] | any> {
  try {
    return await axiosClient.post<Ingredient[]>(
      "/ingredients/new-ingredient",
      data,
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

export async function updateIngredientsToDB(
  data: Ingredient,
  token: string
): Promise<objectCreated[] | any> {
  try {
    return await axiosClient.put<Ingredient[]>(
      "/ingredients/update-ingredient",
      data,
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

export async function deleteIngredientsFromDB(
  data: Ingredient,
  token: string
): Promise<objectCreated[] | any> {
  try {
    return await axiosClient.delete<Ingredient[]>(
      `/ingredients/delete-ingredient/${data.user_id}/${data.id}`,
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