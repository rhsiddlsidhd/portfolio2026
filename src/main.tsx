import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import projects from "@/data/projects.json";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import Project from "./pages/Project.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/project/:id",
            loader: async ({ params }) => {
              const project = projects.find((p) => p.id === params.id);

              if (!project) {
                throw new Response("Not Found", { status: 404 });
              }
              return project;
            },
            element: <Project />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
);
