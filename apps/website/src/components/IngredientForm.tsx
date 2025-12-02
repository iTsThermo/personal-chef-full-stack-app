import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { FormId, Ingredient } from "@monorepo/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { redirect } from "react-router-dom";
import { useCreateIngredient, useUpdateIngredient } from "@/lib/queries.ingredients";
import { useAuth0 } from "@auth0/auth0-react";
import { type FC } from "react";

export const IngredientForm: FC<FormId> = ({ Item, FormId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Ingredient>({
    defaultValues: {
      ingredient: Item?.ingredient,
      quantity: Item?.quantity,
      measurement: Item?.measurement,
    },
  });

  const { user } = useAuth0();

  const user_id = user?.sub;

  if (!user_id) {
    redirect("login");
    return;
  }

  const { mutate: updateMutate } = useUpdateIngredient();
  const { mutate: createMutate } = useCreateIngredient();

  const onSubmit: SubmitHandler<Ingredient> = (data: Ingredient) => {
    data.user_id = user_id;

    if (Item) {
      data.id = Item.id;
      updateMutate(data);
    } else {
      createMutate(data);
    }

    reset();
    setFocus("ingredient");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={FormId.current}
      className="flex flex-col gap-2"
    >
      <Label htmlFor="ingredient">Ingredient:</Label>
      <Input
        type="text"
        {...register("ingredient", { required: true })}
      ></Input>
      {errors.ingredient && (
        <span>Ingredient is required and must be valid</span>
      )}
      <Label htmlFor="quantity">Quantity:</Label>
      <Input
        type="number"
        step={0.01}
        {...register("quantity", {
          required: true,
          valueAsNumber: true,
        })}
      ></Input>
      {errors.quantity && <span>Quantity is required and must be valid</span>}
      <Label htmlFor="measurement">Measurement(Optional):</Label>
      <Input type="text" {...register("measurement")}></Input>
      {errors.measurement && <span>Measurement is must be valid</span>}
    </form>
  );
};
