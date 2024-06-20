import { useQuery } from "react-query";
import { apiFranqueadora } from "../../../config/api";
import { congnitoAuthService } from "./CognitoAuthService";

export function useGetMe() {
  async function setHeader() {
    const user = await congnitoAuthService.getToken();
    const authToken = congnitoAuthService.getAuthToken();
    const token = user.accessToken.jwtToken;
    const idToken = user.idToken.jwtToken;
    apiFranqueadora.defaults.headers.Authorization = `Bearer ${token}`;
    apiFranqueadora.defaults.headers.Identity = `${idToken}`;
    apiFranqueadora.defaults.headers.AuthToken = `${authToken}`;
    apiFranqueadora.defaults.headers["ngrok-skip-browser-warning"] = true;
  }
  setHeader();
  const { data, error, isLoading, refetch, isSuccess } = useQuery<
    any | null | undefined
  >(
    ["getMe"],
    async () => {
      const response = await apiFranqueadora.get("/user/me");
      return response.data;
    },
    { enabled: false }
  );

  return {
    data,
    error,
    isLoading,
    refetch,
    isSuccess,
  };
}