import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";
import projects from "@/data/projects.json";
import aiUsage from "@/data/ai-usage.json";
import { lazy, Suspense } from "react";
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const AIDetailPage = lazy(() => import("@/pages/AIDetailPage"));

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
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
