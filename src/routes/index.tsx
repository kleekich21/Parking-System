import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import ParkingLotPage from "../pages/ParkingLotPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "parking-lots/:parkingLotId",
        element: <ParkingLotPage />,
      },
    ],
  },
]);
