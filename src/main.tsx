import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Journal from "./routes/Journal.tsx";
import Account from "./routes/Account.tsx";
import { ThemeProvider } from "./components/themeProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Ledger from "./routes/Ledger.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/journal",
        element: <Journal />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/ledger",
        element: <Ledger />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    <Toaster />
  </React.StrictMode>
);
