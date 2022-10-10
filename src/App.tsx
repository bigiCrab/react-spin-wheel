import { useContext } from "react";
import "./App.scss";
import SpinWheel from "./components/spin-wheel/spin-wheel.component";
import SpinWheelControl from "./components/spin-wheel-control/spin-wheel-control.component";
import { SpinWheelSettingContext } from "./contexts/spin-wheel-setting.context";

const App = () => {
  const { spinWheelSetting, setSpinWheelSetting } = useContext(
    SpinWheelSettingContext
  );
  const { landOnIdx, prizes } = spinWheelSetting;

  return (
    <div className="App">
      <div className="left-container flex-column-center">
        <div className="header-text">
          will land on: {prizes[landOnIdx]?.name}
        </div>
        <div className="spin-wheel-container">
          <SpinWheel
            spinWheelSetting={spinWheelSetting}
            spinText="SPIN"
          ></SpinWheel>
        </div>
      </div>
      <div className="right-container flex-column-center">
        <div className="header-text">Spin Wheel Control</div>
        <div className="spin-wheel-control-container">
          <SpinWheelControl></SpinWheelControl>
        </div>
      </div>
    </div>
  );
};

export default App;
