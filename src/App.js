import React from "react";
import NavBar from "./features/navigation/NavBar/NavBar";
import Inventory from "./features/Inventory/Inventory";
import Routes from "./features/navigation/Routes/Routes";
import { Switch, Route } from "react-router-dom";
import TakeSurvey from "./features/take_survey/TakeSurvey";

function Main() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes />
      </main>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/surveys/take/:id" component={TakeSurvey} />
      <Route path="/" component={Main} />
    </Switch>
  );
}

export default App;
