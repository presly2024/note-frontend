export const BASE_URL =
     String(import.meta.env.VITE_MODE) === "development"
          ? "http://localhost:4000"
          : "https://note-api-tau.vercel.app/";
