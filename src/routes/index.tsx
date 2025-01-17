import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ParkingLotPage from "../pages/ParkingLotPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "parking-lots/:parkingLotId",
        element: <ParkingLotPage />,
      },
    ],
  },
]);
