import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/home"
import Root from "./routes/root"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        lazy: async () => {
          const module = await import("./routes/login")
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
      const module = await import("./routes/dashboardRoot")
      return {
        Component: module.default,
      }
    },

    children: [
      {
        path: "/dashboard",
        lazy: async () => {
          const module = await import("./routes/dashboard")
          return {
            Component: module.default,
          }
        },
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
