import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

// Render the root component
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Provides NextUIProvider */}
    <NextUIProvider className="h-[100vh]">
      {/* Main content container */}
      <main className="light text-foreground bg-background h-screen">
        {/* Renders the main application component */}
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
