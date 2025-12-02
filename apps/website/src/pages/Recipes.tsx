import { RecipeCard } from "@/components/RecipeCard";
import { useFetchRecipes, useFetchSavedRecipes } from "@/lib/queries.recipes";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { RecipeSkeletion } from "@/components/RecipeSkeleton";
import { LoadingCircle } from "@/components/LoadingCircle";

function Recipes() {
  const { user, isLoading } = useAuth0();

  const {
    data: aiRecipes,
    isLoading: aiLoaded,
    error: aiError,
  } = useFetchRecipes(user?.sub as string);

  const {
    data: savedRecipes,
    isLoading: savedLoaded,
    error: savedErrors,
  } = useFetchSavedRecipes(user?.sub as string);

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (aiError || savedErrors) {
    return <p>Error</p>;
  }

  return (
    <>
      <h1 className="lg:text-4xl font-extrabold mb-1 text-2xl text-center">
        Recipes.
      </h1>
      <h1 className="text-2xl font-extrabold mt-10">
        You can find all avaliable recipes here.
      </h1>
      <hr className="h-.5 bg-accent-foreground mb-3"></hr>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {aiLoaded ? (
          <>
            <RecipeSkeletion />
            <RecipeSkeletion />
            <RecipeSkeletion />
          </>
        ) : (
          aiRecipes?.map((recipe, i) => {
            return <RecipeCard key={i} isSave={false} recipe={recipe} />;
          })
        )}
      </div>

      <h1 className="text-2xl font-extrabold mt-6">Saved Recipes</h1>
      <hr className="h-.5 bg-accent-foreground mb-3"></hr>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {savedLoaded && savedRecipes ? (
          <RecipeSkeletion />
        ) : (
          savedRecipes?.map((recipe, i) => {
            return <RecipeCard key={i} isSave={true} recipe={recipe} />;
          })
        )}
      </div>
    </>
  );
}

export default withAuthenticationRequired(Recipes, {
  onRedirecting: () => <LoadingCircle />,
  returnTo: () => "/recipes",
});
