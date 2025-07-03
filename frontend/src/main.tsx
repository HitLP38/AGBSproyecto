// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppSPA } from "./app/AppSPA";

import { ClerkProvider } from "@clerk/clerk-react";
//import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppSPA />
    </ClerkProvider>
  </React.StrictMode>
);
