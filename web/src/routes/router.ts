import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./root")
      return {
        Component: module.default,
      }
    },
    children: [
      {
        path: "/",
        lazy: async () => {
          const module = await import("./main/root")
          return {
            Component: module.default,
          }
        },
        children: [
          {
            path: "/",
            lazy: async () => {
              const module = await import("./main/home")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/login",
            lazy: async () => {
              const module = await import("./dashboard/login")
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
          const module = await import("./dashboard/root")
          return {
            Component: module.default,
          }
        },

        children: [
          {
            path: "/dashboard",
            lazy: async () => {
              const module = await import("./dashboard/dashboard")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/dashboard/users",
            lazy: async () => {
              const module = await import("./dashboard/users")
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
