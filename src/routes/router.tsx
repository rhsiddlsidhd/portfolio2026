import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { AIDetailPage } from "@/pages/AIDetailPage";
import projects from "@/data/projects.json";
import aiUsage from "@/data/ai-usage.json";



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
            element: <ProjectDetailPage />,
          },
          {
            path: "/ai/:id",
            loader: async ({ params }: LoaderFunctionArgs) => {
              const item = aiUsage.find((a) => a.id === params.id);

              if (!item) {
                throw new Response("Not Found", { status: 404 });
              }
              return item;
            },
            element: <AIDetailPage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
