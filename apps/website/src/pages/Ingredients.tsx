// Auth0 redirect libs
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

// Import react query fetch
import { useFetchIngredients } from "@/lib/queries.ingredients";

// React router
import { IngredientCard } from "@/components/IngredientCard";
import { IngredientFormPopUp } from "@/components/IngredientFormPopUp";
import { useEffect, useRef, useState } from "react";
import { ViewIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { LoadingCircle } from "@/components/LoadingCircle";
import { Input } from "@/components/ui/input";

const GRIDVIEWS = [
  "grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 auto-rows-fr",
  "grid lg:grid-cols-1 gap-2 md:grid-cols-1 sm:grid-cols-1 auto-rows-fr",
];

function Ingredients() {
  const { user, isLoading } = useAuth0();
  const formRef = useRef<string>("NewIngredientForm");
  const [ingredientCardView, setIngredientCardView] = useState<number>(0);

  const { data } = useFetchIngredients(user?.sub as string);

  const [searchItem, setSearchItem] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(data);

  useEffect(() => {
    if (data) {
      setFilteredIngredients(data);
    }
  }, [data]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      setFilteredIngredients(data);
      setSearchItem(searchTerm);
      return;
    }
    setSearchItem(searchTerm);

    const filteredItems = data?.filter((data) =>
      data.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredIngredients(filteredItems);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      <h1 className="lg:text-4xl font-extrabold mb-1 text-2xl text-center">
        Ingredients.
      </h1>
      <div className="flex justify-between items-center flex-col md:flex-row mt-10">
        <h2 className="text-2xl font-extrabold mb-2">Inventory</h2>
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search"
          />
          <div className="cursor-pointer hidden md:flex">
            <Popover>
              <PopoverTrigger>
                <ViewIcon />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 w-40 text-center">
                <p>View:</p>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setIngredientCardView(1);
                  }}
                >
                  List
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setIngredientCardView(0);
                  }}
                >
                  Grid
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <IngredientFormPopUp FormId={formRef} />
        </div>
      </div>
      <hr className="h-.5 bg-accent-foreground mb-3 mt-1"></hr>
      <div className={`${GRIDVIEWS[ingredientCardView]}`}>
        {filteredIngredients?.map((item) => {
          return (
            <IngredientCard
              view={ingredientCardView}
              key={item.id}
              item={item}
            />
          );
        })}
        {data?.length == 0 && (
          <p>You don't have any ingredients in your inventory!</p>
        )}
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Ingredients, {
  onRedirecting: () => <LoadingCircle />,
  returnTo: () => "/ingredients",
});
