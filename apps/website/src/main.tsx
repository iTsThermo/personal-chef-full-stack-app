import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Auth provider
import { Auth0Provider } from "@auth0/auth0-react";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ingredients from "./pages/Ingredients.tsx";
import Login from "./pages/Login.tsx";
import App from "./App.tsx";
import { Error } from "./pages/Error.tsx";
import Recipes from "./pages/Recipes.tsx";

// react query
import { queryClient } from "./lib/client.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Landing } from "./pages/Landing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: "ingredients",
        element: <Ingredients />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/ingredients',
        audience: import.meta.env.VITE_AUDIENCE,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
