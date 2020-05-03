import Inventory from "../Inventory/Inventory";
import InventoryPage from "../../pages/InventoryPage/InventoryPage";

export default [
  {
    path: "/inventory",
    exact: true,
    component: InventoryPage,
    label: "Almacenamiento",
  },
  {
    path: "/users",
    exact: true,
    component: null,
    label: "Usuarios",
  },
];
