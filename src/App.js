import React from "react";
import NavBar from "./features/navigation/NavBar/NavBar";
import Inventory from "./features/Inventory/Inventory";
import Routes from "./features/navigation/Routes/Routes";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
