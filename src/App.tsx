import { useState } from "react";
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
  prizes: Prize[];
  ux: { baseRotationTime: number; baseDegree: number };
};

const SPIN_WHEEL_SETTING: SpinWheelSetting = {
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
      proportion: 1,
    },
    {
      name: "🥞",
      bgColor: "#d35400",
      proportion: 1,
    },
    {
      name: "🌭",
      bgColor: "#c0392b",
      proportion: 1,
    },
  ],
  ux: {
    baseRotationTime: 5,
    baseDegree: 7 * 360, // minimum rotation angle
  },
};

const App = () => {
  const [spinWheelSetting, setSpinWheelSetting] = useState(SPIN_WHEEL_SETTING);
  const { landOnIdx, prizes } = spinWheelSetting;

  return (
    <div className="App">
      <div className="spin-wheel-container">
        <div className="showSelect">
          will land on: {prizes[landOnIdx]?.name}
        </div>
        <SpinWheel
          spinWheelSetting={spinWheelSetting}
          spinText="SPIN"
        ></SpinWheel>
      </div>
      <div className="spin-wheel-control-container">
        <SpinWheelControl></SpinWheelControl>
        {/* TODO move to SpinWheelControl */}
        {prizes.map((prize, index) => (
          <div
            key={prize.name}
            style={{
              color: prize.color,
              backgroundColor: prize.bgColor,
            }}
          >
            <span style={{ display: "inline-block", width: "3em" }}>
              {index === landOnIdx ? (
                "✨"
              ) : (
                <button
                  style={{ fontSize: "0.5em" }}
                  onClick={() => {
                    setSpinWheelSetting((pre) => ({
                      ...pre,
                      landOnIdx: index,
                    }));
                  }}
                >
                  Land on me
                </button>
              )}
            </span>
            <span>
              name:
              {/* TODO implement ReactLink */}
              <input
                type="text"
                style={{ maxWidth: "4.5rem" }}
                value={prize.name}
                onChange={(event) => {
                  setSpinWheelSetting((pre) => {
                    let newPrizes = pre.prizes.slice();
                    newPrizes[index].name = event.target.value;
                    return {
                      ...pre,
                      prizes: newPrizes,
                    };
                  });
                }}
              />
            </span>
            <span>
              proportion:
              <input
                type="number"
                style={{ maxWidth: "2.5rem" }}
                value={prize.proportion}
                min="0.01"
                onChange={(event) => {
                  setSpinWheelSetting((pre) => {
                    let newPrizes = pre.prizes.slice();
                    newPrizes[index].proportion = Number(event.target.value);
                    return {
                      ...pre,
                      prizes: newPrizes,
                    };
                  });
                }}
              />
            </span>
            <button
              onClick={(event) => {
                setSpinWheelSetting((pre) => ({
                  ...pre,
                  prizes: pre.prizes.filter((v) => v !== prize),
                }));
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={(event) => {
            setSpinWheelSetting(SPIN_WHEEL_SETTING);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
