import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";
import Project from "@/pages/Project";
import projects from "@/data/projects.json";



export const routes = [
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
            loader: async ({ params }: LoaderFunctionArgs) => {
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
];

export const router = createBrowserRouter(routes);
