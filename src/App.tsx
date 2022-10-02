import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import SpinWheel from "./components/spin-wheel/spin-wheel.component";
import SpinWheelControl from "./components/spin-wheel-control/spin-wheel-control.component";

function App() {
  return (
    <div className="App">
      <div className="spin-wheel-container">
        <SpinWheel></SpinWheel>
      </div>
      <div className="spin-wheel-control-container">
        <SpinWheelControl></SpinWheelControl>
      </div>
    </div>
  );
}

export default App;
