import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreateUnits from './Pages/CreateUnits'
import Navbar from "./components/Home/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/materia/:matterId",
    element: <CreateUnits />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Navbar />

    <RouterProvider router={router} />
  </React.StrictMode>,
);
