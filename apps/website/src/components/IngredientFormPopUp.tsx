import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { IngredientForm } from "./IngredientForm";
import { type FC } from "react";
import type { FormId } from "@monorepo/utils";

export const IngredientFormPopUp: FC<FormId> = ({ FormId }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">New Ingredient</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>What would you like to add?</AlertDialogTitle>
          <AlertDialogDescription>
            Adding an item will automatically update the recipes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <IngredientForm FormId={FormId}></IngredientForm>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button type="submit" form={FormId.current}>
            Add
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
