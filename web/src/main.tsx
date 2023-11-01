import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./routes/root")
      return {
        Component: module.default,
      }
    },
    children: [
      {
        path: "/",
        lazy: async () => {
          const module = await import("./routes/main/root")
          return {
            Component: module.default,
          }
        },
        children: [
          {
            path: "/",
            lazy: async () => {
              const module = await import("./routes/main/home")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/login",
            lazy: async () => {
              const module = await import("./routes/dashboard/login")
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
          const module = await import("./routes/dashboard/root")
          return {
            Component: module.default,
          }
        },

        children: [
          {
            path: "/dashboard",
            lazy: async () => {
              const module = await import("./routes/dashboard/dashboard")
              return {
                Component: module.default,
              }
            },
          },
          {
            path: "/dashboard/users",
            lazy: async () => {
              const module = await import("./routes/dashboard/users")
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
