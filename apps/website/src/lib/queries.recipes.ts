import { useGetAuth0Token } from "@/hooks/useGetAuth0Token";
import type { objectCreated, Recipe } from "@monorepo/utils";
import { useMutation, useQuery, type QueryObserverResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { deleteRecipeFromDB, getRecipes, getSavedRecipes, saveRecipeToDB } from "./api.recipes";
import { queryClient } from "./client";
import { toast } from "sonner";

export const useDeleteRecipe = () => {
  const token = useGetAuth0Token();

  return useMutation<
    AxiosResponse<objectCreated[]>,
    unknown,
    { data: Recipe },
    unknown
  >({
    mutationFn: ({ data }) => deleteRecipeFromDB(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", "saved"],
      });
      toast("Deleted Recipe");
    },
    onError: () => {
      toast("Error deleting Recipe");
    },
  });
};

export const useSaveRecipe = () => {
  const token = useGetAuth0Token();

  return useMutation<
    AxiosResponse<objectCreated[]>,
    unknown,
    { data: Recipe },
    unknown
  >({
    mutationFn: ({ data }) => saveRecipeToDB(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes", "saved"],
      });
      toast("Saved Recipe");
    },
    onError: () => {
      toast("Error saving Recipe");
    },
  });
};

export const useFetchRecipes = (
  user_id: string
): QueryObserverResult<Recipe[], unknown> => {
  const token = useGetAuth0Token();

  return useQuery<Recipe[], unknown>({
    queryKey: ["recipes", "ingredients", user_id],
    queryFn: async () => {
      const response = await getRecipes(user_id, token);
      return response;
    },
    enabled: !!user_id && !!token,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
};

export const useFetchSavedRecipes = (
  user_id: string
): QueryObserverResult<Recipe[], unknown> => {
  const token = useGetAuth0Token();

  return useQuery<Recipe[], unknown>({
    queryKey: ["recipes", "saved", , user_id],
    queryFn: async () => {
      const response = await getSavedRecipes(user_id, token);
      return response;
    },
    enabled: !!user_id && !!token,
  });
};