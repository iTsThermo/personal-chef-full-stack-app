import { Save, TrashIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { Recipe } from "@monorepo/utils";
import { useDeleteRecipe, useSaveRecipe } from "@/lib/queries.recipes";
import { useAuth0 } from "@auth0/auth0-react";

export function RecipeCard({
  recipe,
  isSave,
}: {
  recipe: Recipe;
  isSave: boolean;
}) {
  const { mutate: mutateSave } = useSaveRecipe();
  const { mutate: mutateDelete } = useDeleteRecipe();
  const { user } = useAuth0();

  return (
    <Card
      key={recipe.name}
      className="animate-[fade-up_1s_ease-in-out_forwards] hover:scale-102 duration-200 ease-in-out"
    >
      <CardHeader>
        <CardTitle className="font-extrabold text-2xl">{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
        <CardAction>
          {!isSave ? (
            <Save
              className="cursor-pointer"
              size={20}
              onClick={() => {
                const user_id = user?.sub;
                if (!user_id) {
                  return;
                }
                const saveRecipeData: Recipe = {
                  user_id: user_id,
                  name: recipe.name,
                  description: recipe.description,
                  steps: recipe.steps,
                  ingredients: recipe.ingredients,
                };

                mutateSave({ data: saveRecipeData });
              }}
            ></Save>
          ) : (
            <TrashIcon
              className="cursor-pointer"
              color="red"
              size={20}
              onClick={() => {
                const user_id = user?.sub;
                if (!user_id) {
                  return;
                }
                recipe.user_id = user_id;
                mutateDelete({ data: recipe });
              }}
            ></TrashIcon>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="font-extrabold">Ingredients:</p>
        <ul className="text-muted-foreground list-disc list-inside">
          {recipe.ingredients.map((ingredient, i) => {
            return (
              <li key={i}>
                {ingredient.name}: {ingredient.amount}
              </li>
            );
          })}
        </ul>
        <p className="font-extrabold">Steps:</p>
        <ul className="text-muted-foreground list-disc list-inside">
          {recipe.steps.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
