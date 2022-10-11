import { createContext, useEffect, useState } from "react";

export type Prize = {
  name: string; // The name of the prize
  color?: string; // text color,  stand out from bgColor
  bgColor: string; // background color
  proportion: number; // proportion of the board
};

export type SpinWheelSetting = {
  landOnIdx: number; // well land on index of the prizes
  prizes: Prize[]; //  contents of the board
  ux: { baseRotationTime: number; baseDegree: number; spinAniEnable: boolean }; // spin animations
  ui?: { width?: string; fontSize?: string }; // wheel sizes
};

const SPIN_WHEEL_DEFAULT_SETTING: SpinWheelSetting = {
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
    // TODO add additional animations time range, transition porp
    baseRotationTime: 4,
    baseDegree: 7 * 360,
    spinAniEnable: true,
  },
  ui: {
    width: "350px",
    fontSize: "18px",
  },
};

export const SpinWheelSettingContext = createContext({
  spinWheelSetting: SPIN_WHEEL_DEFAULT_SETTING,
  setSpinWheelSetting: (() => {}) as React.Dispatch<
    React.SetStateAction<SpinWheelSetting>
  >,
  resetSpinWheelSetting: () => {},
});

export const SpinWheelSettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [spinWheelSetting, setSpinWheelSetting] = useState(
    SPIN_WHEEL_DEFAULT_SETTING
  );
  const { prizes } = spinWheelSetting;

  // update landOnIdx
  useEffect(() => {
    setSpinWheelSetting((pre) => ({
      ...pre,
      landOnIdx: Math.min(pre.landOnIdx, prizes.length - 1),
    }));
  }, [prizes.length]);

  // TODO maybe make setSpinWheelSetting function private, then export setSpinWheelXXXSetting
  function resetSpinWheelSetting() {
    setSpinWheelSetting(SPIN_WHEEL_DEFAULT_SETTING);
  }

  return (
    <SpinWheelSettingContext.Provider
      value={{ spinWheelSetting, setSpinWheelSetting, resetSpinWheelSetting }}
    >
      {children}
    </SpinWheelSettingContext.Provider>
  );
};
