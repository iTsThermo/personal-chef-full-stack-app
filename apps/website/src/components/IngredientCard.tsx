import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import type { Ingredient } from "@monorepo/utils";
import { IngredientForm } from "./IngredientForm";
import { useRef } from "react";
import { useDeleteIngredient } from "@/lib/queries.ingredients";

export function IngredientCard(data: { item: Ingredient; view: number }) {
  const formRef = useRef<string>("Update-Ingredient");
  const { mutate } = useDeleteIngredient();

  return (
    <>
      {data.view === 0 ? (
        <Card className="animate-[fade-up_1s_ease-in-out_forwards] hover:scale-102 duration-200 ease-in-out">
          <CardHeader>
            <CardTitle className="font-extrabold text-xl">
              {data.item.ingredient}
              <p className="hidden md:block md:text-muted-foreground md:text-sm">
                Quantity: {data.item.quantity}
                <small>{data.item.measurement}</small>
              </p>
              <p className="md:hidden text-muted-foreground text-sm">
                Q: {data.item.quantity}
                <small>{data.item.measurement}</small>
              </p>
            </CardTitle>
            {/* <CardDescription>AI summary of what it is or taste</CardDescription> */}
            <CardAction>
              <Popover>
                <div className="flex gap-2">
                  <PopoverTrigger className="flex">
                    <PencilIcon
                      size={20}
                      className="cursor-pointer"
                    ></PencilIcon>
                  </PopoverTrigger>
                  <TrashIcon
                    className="cursor-pointer"
                    color="red"
                    size={20}
                    onClick={() => {
                      mutate({ data: data.item });
                    }}
                  ></TrashIcon>
                </div>
                <PopoverContent className="flex flex-col">
                  <h1 className="underline font-extrabold text-2xl mb-1">
                    Edit:
                  </h1>
                  <IngredientForm
                    Item={data.item}
                    FormId={formRef}
                  ></IngredientForm>
                  <div className="flex justify-around">
                    <Button
                      form={formRef.current}
                      className="mt-3 max-w-1/3 self-end"
                    >
                      Update
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </CardAction>
          </CardHeader>
        </Card>
      ) : (
        <Card className="animate-[fade-up_1s_ease-in-out_forwards] flex flex-row justify-between h-20">
          <div>
            <CardHeader>
              <CardTitle className="font-extrabold text-lg w-lg flex items-center gap-3">
                {data.item.ingredient}
                <p className="hidden md:block md:text-muted-foreground md:text-sm">
                  Quantity: {data.item.quantity}
                  <small>{data.item.measurement}</small>
                </p>
                <p className="md:hidden text-muted-foreground text-sm">
                  Q: {data.item.quantity}
                  <small>{data.item.measurement}</small>
                </p>
              </CardTitle>
              {/* <CardDescription>AI summary of what it is or taste</CardDescription> */}
            </CardHeader>
          </div>
          <CardContent>
            <Popover>
              <div className="flex gap-2">
                <PopoverTrigger className="flex">
                  <PencilIcon size={20} className="cursor-pointer"></PencilIcon>
                </PopoverTrigger>
                <TrashIcon
                  className="cursor-pointer"
                  color="red"
                  size={20}
                  onClick={() => {
                    mutate({ data: data.item });
                  }}
                ></TrashIcon>
              </div>
              <PopoverContent className="flex flex-col">
                <h1 className="underline font-extrabold text-2xl mb-1">
                  Edit:
                </h1>
                <IngredientForm
                  Item={data.item}
                  FormId={formRef}
                ></IngredientForm>
                <div className="flex justify-around">
                  <Button
                    form={formRef.current}
                    className="mt-3 max-w-1/3 self-end"
                  >
                    Update
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
      )}
    </>
  );
}
