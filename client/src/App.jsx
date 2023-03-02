import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Add from "./pages/Add";
import NavBar from "./components/NavBar";
import RedirectLayout from "./components/RedirectLayout";
import NotFound from "./pages/NotFound";

const Layout = () => {
  return (
    <div className="flex flex-col md:w-[70%] items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <NavBar />
      <Outlet />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectLayout />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/add",
              element: <Add />,
            },
          ],
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
