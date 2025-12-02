import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function useGetAuth0Token(): string {
  const [token, setToken] = useState<string>('');
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (err) {
        console.error("Failed to get access token:", err);
        navigate("/login");
      }
    };

    if (!isLoading && isAuthenticated) {
      getToken();
    }
  }, [getAccessTokenSilently, isLoading, isAuthenticated, navigate]);

  return token;
}