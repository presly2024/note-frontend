/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
          extend: {
               colors: {
                    primary: "#2d45ff",
                    secondary: "#ef8632"
               }
          },
     },
     plugins: [],
}

