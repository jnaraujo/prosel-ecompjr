import { createBrowserRouter } from "react-router-dom"
import Root from "@/pages/root"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const module = await import("@/pages/home/root")
          return {
            Component: module.default,
          }
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import("@/pages/home/home")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/login",
            lazy: async () => {
              const module = await import("@/pages/dashboard/login")
              return {
                Component: module.default,
              }
            },
          },
        ],
      },
      {
        path: "/dashboard",
        lazy: async () => {
          const module = await import("@/pages/dashboard/root")
          return {
            Component: module.default,
          }
        },

        children: [
          {
            path: "/dashboard",
            lazy: async () => {
              const module = await import("@/pages/dashboard/dashboard")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/dashboard/users",
            lazy: async () => {
              const module = await import("@/pages/dashboard/users")
              return {
                Component: module.default,
              }
            },
          },
        ],
      },
    ],
  },
])
