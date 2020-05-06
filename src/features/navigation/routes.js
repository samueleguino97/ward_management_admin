import Inventory from "../Inventory/Inventory";
import InventoryPage from "../../pages/InventoryPage/InventoryPage";
import FormsPage from "../../pages/InventoryPage/FormsPage";
import CreatedFormDetail from "../created_form_detail/CreatedFormDetail";
import TakeSurvey from "../take_survey/TakeSurvey";
import SurveyResults from "../survey_results/SurveyResults";

export default [
  {
    path: "/surveys/results/:id",
    exact: true,
    noNavBar: true,
    component: SurveyResults,
  },
  {
    path: "/surveys/:id",
    exact: true,
    noNavBar: true,
    component: CreatedFormDetail,
  },
  {
    path: "/surveys",
    component: FormsPage,
    label: "Encuestas",
  },
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
