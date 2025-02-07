import axios from "axios";

export const useAuthentication = () => {
  const env = import.meta.env;

  const signIn = async () => {
    await axios.post(`${env.VITE_API_URL_AUTH}/login`, {}).catch((err) => err);
  };

  return { signIn };
};
