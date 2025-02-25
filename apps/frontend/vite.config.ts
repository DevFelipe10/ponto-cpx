import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envPrefix = "REACT_APP_";
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: Record<string, string> = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith(envPrefix)) {
      processEnv[key] = env[key];
    }
  });

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:3000",
    //       changeOrigin: true,
    //     },
    //   },
    // },
  };
});
