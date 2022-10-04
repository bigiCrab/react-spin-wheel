import { useEffect, useState } from "react";
import "./App.scss";
import SpinWheel from "./components/spin-wheel/spin-wheel.component";
import SpinWheelControl from "./components/spin-wheel-control/spin-wheel-control.component";

export type Prize = {
  name: string; // The name of the prize
  color?: string; // text color,  stand out from bgColor
  bgColor: string; // background color
  proportion: number; // proportion of the board
};

export type SpinWheelSetting = {
  landOnIdx: number; // well land on index of the prizes
  prizes: Prize[]; //  contents of the board
  ux: { baseRotationTime: number; baseDegree: number }; // spin animations
  ui?: { width: string; fontSize: string }; // wheel sizes
};

const SPIN_WHEEL_SETTING: SpinWheelSetting = {
  // TODO change to landOnId
  landOnIdx: 0,
  prizes: [
    {
      name: "🍤",
      bgColor: "#16a085",
      proportion: 1,
    },
    {
      name: "🥩",
      bgColor: "#2980b9",
      proportion: 1,
    },
    {
      name: "🍕",
      bgColor: "#34495e",
      proportion: 1,
    },
    {
      name: "🍔",
      bgColor: "#f39c12",
      proportion: 2,
    },
    {
      name: "🥞",
      bgColor: "#d35400",
      proportion: 2,
    },
    {
      name: "🌭",
      bgColor: "#c0392b",
      proportion: 4,
    },
  ],
  ux: {
    baseRotationTime: 4,
    baseDegree: 7 * 360, // minimum rotation angle
  },
  ui: {
    width: "350px",
    fontSize: "18px",
  },
};

const App = () => {
  const [spinWheelSetting, setSpinWheelSetting] = useState(SPIN_WHEEL_SETTING);
  const { landOnIdx, prizes, ui } = spinWheelSetting;

  useEffect(() => {
    setSpinWheelSetting((pre) => ({
      ...pre,
      landOnIdx: Math.min(pre.landOnIdx, prizes.length - 1),
    }));
  }, [prizes.length]);

  return (
    <div className="App">
      <div className="left-container flex-column-center">
        <div className="header-text">
          will land on: {prizes[landOnIdx]?.name}
        </div>
        <div
          className="spin-wheel-container"
          style={{
            width: ui?.width,
            height: ui?.width,
            fontSize: ui?.fontSize,
          }}
        >
          <SpinWheel
            spinWheelSetting={spinWheelSetting}
            spinText="SPIN"
          ></SpinWheel>
        </div>
      </div>
      <div className="right-container flex-column-center">
        <div className="header-text">SpinWheelControl</div>
        <div className="spin-wheel-control-container">
          <SpinWheelControl
            spinWheelSetting={spinWheelSetting}
            onLandOnIdxChangeHandler={(index) => {
              setSpinWheelSetting((pre) => ({
                ...pre,
                landOnIdx: index,
              }));
            }}
            onPrizeNameChangeHandler={(event, index) => {
              setSpinWheelSetting((pre) => {
                let newPrizes = pre.prizes.slice();
                newPrizes[index].name = event.target.value;
                return {
                  ...pre,
                  prizes: newPrizes,
                };
              });
            }}
            onProportionChangeHandler={(event, index) => {
              setSpinWheelSetting((pre) => {
                let newPrizes = pre.prizes.slice();
                newPrizes[index].proportion = Number(event.target.value);
                return {
                  ...pre,
                  prizes: newPrizes,
                };
              });
            }}
            onDeleteHandler={(prize) => {
              setSpinWheelSetting((pre) => ({
                ...pre,
                prizes: pre.prizes.filter((v) => v !== prize),
              }));
            }}
            onResetHandler={() => {
              setSpinWheelSetting(SPIN_WHEEL_SETTING);
            }}
          ></SpinWheelControl>
        </div>
      </div>
    </div>
  );
};

export default App;
