export const BASE_URL =
     import.meta.env.VITE_MODE === "development"
          ? "http://localhost:4000"
          : "https://note-api-azure.vercel.app/";
