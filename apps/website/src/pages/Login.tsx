import { LoadingCircle } from "@/components/LoadingCircle";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="text-3xl font-extrabold">
        It seems you don't have an account...
      </h1>
      <p>Create an account or login to find new recipes :)</p>
      {!isAuthenticated && (
        <Button
          onClick={() =>
            loginWithRedirect({
              appState: {
                returnTo: window.location.href,
              },
            })
          }
        >
          Log in or Sign Up
        </Button>
      )}
    </div>
  );
}

export default Login;