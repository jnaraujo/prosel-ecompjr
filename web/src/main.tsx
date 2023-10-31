import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    lazy: lazyLoad("./routes/root"),
    children: [
      {
        path: "/",
        lazy: lazyLoad("./routes/main/root"),
        children: [
          {
            path: "/",
            lazy: lazyLoad("./routes/main/home"),
          },
          {
            path: "/login",
            lazy: lazyLoad("./routes/main/login"),
          },
        ],
      },
      {
        path: "/dashboard",
        lazy: lazyLoad("./routes/dashboard/root"),
        children: [
          {
            path: "/dashboard",
            lazy: lazyLoad("./routes/dashboard/dashboard"),
          },
          {
            path: "/dashboard/users",
            lazy: lazyLoad("./routes/dashboard/users"),
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

function lazyLoad(path: string) {
  return async () => {
    const module = await import(path)
    return {
      Component: module.default,
    }
  }
}
