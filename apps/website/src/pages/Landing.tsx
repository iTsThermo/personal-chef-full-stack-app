import ingredientPng from "@/assets/darkfoodimg.jpg";
import recipesPng from "@/assets/darkfoodimg2.jpg";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function Landing() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="animate-[fade-up_1s_ease-in-out_forwards]">
      <h1 className="lg:text-4xl font-extrabold mb-1 text-2xl text-center">
        Create More, Waste Less
      </h1>
      <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:place-items-center sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-5">
        <h2 className="md:text-lg sm:text-md text-center">
          Take the stress out of meal planning with{" "}
          <strong>Personal Chef</strong>, the smarter way to cook. Our digital
          chef provides you with unique recipes tailored to the ingredients in
          your kitchen. Just add all of your available ingredients, and we'll
          show you what you can make. It's as simple as that! Say goodbye to
          food waste and hello to culinary inspiration.{" "}
          <span className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <Link
              to={""}
              onClick={() =>
                loginWithRedirect()
              }
            >
              Start cooking today!
            </Link>
          </span>
        </h2>
        <img
          className="mask-x-from-85% mask-x-to-95% mask-y-from-85% mask-y-to-100% md:max-w-md sm:max-w-sm"
          src={recipesPng}
          alt="picture of food"
        />
        <img
          className="mask-x-from-85% mask-x-to-95% mask-y-from-90% mask-y-to-100% md:max-w-md sm:max-w-sm"
          src={ingredientPng}
          alt="picture of food"
        />
        <h2 className="md:text-lg sm:text-md text-center">
          We help you see the possibilities in your pantry. By using the
          ingredients you already have, you'll reduce waste and unlock a world
          of delicious, creative meals. Stop wondering what's for dinner and
          start cooking with confidence.
        </h2>
      </div>
    </div>
  );
}
