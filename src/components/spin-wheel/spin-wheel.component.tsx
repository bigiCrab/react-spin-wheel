import { useState } from "react";
import { Prize, SpinWheelSetting } from "../../App";
import "./spin-wheel.style.scss";

const SpinWheel = ({
  spinWheelSetting,
  spinText,
}: {
  spinWheelSetting: SpinWheelSetting;
  spinText?: string;
}) => {
  const DEFAULT_SPIN_TEXT = "START";
  const {
    prizes,
    landOnIdx,
    ux: { baseRotationTime, baseDegree },
  } = spinWheelSetting;

  const [innerWheelRotate, setInnerWheelRotate] = useState(0);

  return (
    <div className="spin-wheel">
      <div className="wheel">
        <div
          className="inner-wheel"
          style={{
            rotate: `${innerWheelRotate}deg`,
            transition: `all ${baseRotationTime}s cubic-bezier(0.11,-0.03, 0, 1)`,
          }}
        >
          {prizes.map((prize, i) => (
            <div
              className="sec"
              key={i}
              style={{
                rotate: `${60 * i}deg`,
                color: `${prize.color}`,
                borderColor: `${prize.bgColor}`,
              }}
            >
              <span className="prize">{prize.name}</span>
            </div>
          ))}
        </div>

        <div
          className="spin-btn"
          onClick={() => {
            // TODO do some calculations here
            setInnerWheelRotate((pre) => innerWheelRotate + baseDegree);
          }}
        >
          <div className="inner-spin">
            <div className="spin-text">{spinText ?? DEFAULT_SPIN_TEXT}</div>
          </div>
        </div>

        <div className="shine"></div>
      </div>
    </div>
  );
};
export default SpinWheel;
