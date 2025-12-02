import {
  useQuery,
  type QueryObserverResult,
  useMutation,
} from "@tanstack/react-query";
import {
  getIngredientsFromDB,
  addIngredientsToDB,
  updateIngredientsToDB,
  deleteIngredientsFromDB,
} from "./api.ingredients";

import type { Ingredient, objectCreated } from "@monorepo/utils";
import type { AxiosResponse } from "axios";
import { queryClient } from "./client";
import { useGetAuth0Token } from "@/hooks/useGetAuth0Token";
import { toast } from "sonner";

//
/////////////// Ingredients Queries
//

export const useFetchIngredients = (
  user_id: string
): QueryObserverResult<Ingredient[], unknown> => {
  const token = useGetAuth0Token();
  return useQuery<Ingredient[], unknown>({
    queryKey: ["ingredients", user_id],
    queryFn: async () => {
      const response = await getIngredientsFromDB(user_id, token);
      return response;
    },
    enabled: !!user_id && !!token,
  });
};

export const useCreateIngredient = () => {
  const token = useGetAuth0Token();

  return useMutation<
    AxiosResponse<objectCreated[]>,
    unknown,
    Ingredient,
    unknown
  >({
    mutationFn: (data) => addIngredientsToDB(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["generated", "recipes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ingredients"],
      });
      toast("Created Ingredient");
    },
    onError: () => {
      toast("Error Creating Ingredient");
    },
  });
};

export const useUpdateIngredient = () => {
  const token = useGetAuth0Token();

  return useMutation<
    AxiosResponse<objectCreated[]>,
    unknown,
    Ingredient,
    unknown
  >({
    mutationFn: (data) => updateIngredientsToDB(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["generated", "recipes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ingredients"],
      });
    },
    onError: () => {
      toast("Error updating Ingredient");
    },
  });
};

export const useDeleteIngredient = () => {
  const token = useGetAuth0Token();

  return useMutation<
    AxiosResponse<objectCreated[]>,
    unknown,
    { data: Ingredient },
    unknown
  >({
    mutationFn: ({ data }) => deleteIngredientsFromDB(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["generated", "recipes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["ingredients"],
      });
      toast("Deleted Ingredient");
    },
    onError: () => {
      toast("Error deleting Ingredient");
    },
  });
};
