export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  appName: "VidhiVyakhya",
  appVersion: "2.0.0",
  environment: import.meta.env.MODE || "development",
} as const;

export default config;
