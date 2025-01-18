import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import ParkingLotPage from "../pages/ParkingLotPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "parking-lots/:parkingLotId",
        element: <ParkingLotPage />,
      },
    ],
  },
]);
