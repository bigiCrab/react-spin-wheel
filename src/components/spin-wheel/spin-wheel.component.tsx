import { useContext, useEffect, useState } from "react";
import {
  SpinWheelSetting,
  SpinWheelSettingContext,
} from "../../contexts/spin-wheel-setting.context";
import { getRandomIntBetween } from "../../utils/random.utils";
import "./spin-wheel.styles.scss";

const SpinWheel = ({
  spinWheelSetting,
  spinText,
}: {
  spinWheelSetting: SpinWheelSetting;
  spinText?: string;
}) => {
  const DEFAULT_SPIN_TEXT = "START";
  // TODO change to context? think about reuseability
  // const { spinWheelSetting } = useContext(SpinWheelSettingContext);
  const {
    prizes,
    landOnIdx,
    ui = { width: "100%", fontSize: "1em" },
    ux: { baseRotationTime, baseDegree, spinAniEnable },
  } = spinWheelSetting;
  // for spin animations
  const [innerWheelRotate, setInnerWheelRotate] = useState(0);

  // calc the angle of the prizes board sector
  const [prizesSectionDegree, setPrizesSectionDegree] = useState<number[]>(
    Array(prizes.length).fill(0)
  );
  useEffect(() => {
    setPrizesSectionDegree(() => {
      let sumOfProportion = prizes.reduce((pre, curr) => {
        return pre + curr.proportion;
      }, 0);

      return prizes.map((prize) => {
        return (360 / sumOfProportion) * prize.proportion;
      });
    });
  }, [prizes]);

  // use to draw clipPath of the prizes, the center of the graph is {deg}
  function calcClipPath(deg: number): string {
    if (deg === Infinity || isNaN(deg)) return "";
    let theta = (deg / 2 / 180) * Math.PI;
    let dx = Math.sin(theta) * 100 * 2;
    let dy = Math.cos(theta) * 100 * 2;
    let calcClipLeftX = 50 - dx / 2;
    let calcClipLeftY = 50 - dy / 2;
    let calcClipRightX = 50 + dx / 2;
    let calcClipRightY = 50 - dy / 2;
    if (deg <= 90) {
      return `polygon(50% 50%, ${calcClipLeftX}% ${calcClipLeftY}%, ${calcClipRightX}% ${calcClipRightY}%)`;
    } else if (deg <= 270) {
      return `polygon(50% 50%, ${calcClipLeftX}% ${calcClipLeftY}%, 0% 0%, 100% 0%, ${calcClipRightX}% ${calcClipRightY}%)`;
    } else if (deg <= 360) {
      return `polygon(50% 50%, ${calcClipLeftX}% ${calcClipLeftY}%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, ${calcClipRightX}% ${calcClipRightY}%)`;
    } else {
      return calcClipPath(deg % 360);
    }
  }

  function onSpinHandler() {
    return () => {
      // TODO copy from codepen, change to english comment, define better variables name
      setInnerWheelRotate((lastRotate) => {
        if (prizesSectionDegree.length === 0) {
          return lastRotate;
        }
        // ??????base????????????360??????(????????????)
        const newBaseDegree =
          baseDegree + lastRotate - ((baseDegree + lastRotate) % 360);
        // ?????????????????????????????????????????????
        const landOnDegreeCenter = getInitPrizeRotate(landOnIdx);
        // ?????????????????????????????????????????????????????????????????????????????????????????????????????????
        const landOnDegreeOffset = getRandomIntBetween(
          landOnDegreeCenter - (prizesSectionDegree[landOnIdx] / 2) * 0.9,
          landOnDegreeCenter + (prizesSectionDegree[landOnIdx] / 2) * 0.9
        );
        // ?????????????????????????????????????????????????????????????????? 360-????????????
        const landOnDegree = 360 - landOnDegreeOffset;
        return newBaseDegree + landOnDegree;
      });
    };
  }
  // get center degree of the prizes[index]
  function getInitPrizeRotate(index: number) {
    if (prizesSectionDegree.length === 0) return 0;

    const startOffSet = prizesSectionDegree[0] / 2;
    const endOffSet = prizesSectionDegree[index] / 2;
    const sumToIndexDegree = prizesSectionDegree
      .slice(0, index + 1)
      .reduce((prev, curr) => prev + curr);

    return sumToIndexDegree - startOffSet - endOffSet;
  }

  return (
    <div
      className="spin-wheel"
      // TODO add styled-components
      style={{
        width: ui.width,
        height: ui.width,
        fontSize: ui.fontSize,
      }}
    >
      <div className="wheel">
        <div
          className="inner-wheel"
          style={{
            rotate: `${innerWheelRotate}deg`,
            transition: spinAniEnable
              ? `all ${baseRotationTime}s cubic-bezier(0.11,-0.03, 0, 1)`
              : "",
          }}
        >
          {prizes.map((prize, i, prizes) => {
            return (
              <div
                className="sector"
                key={i}
                style={{
                  rotate: `${getInitPrizeRotate(i)}deg`,
                  color: `${prize.color}`,
                  backgroundColor: `${prize.bgColor}`,
                  clipPath: calcClipPath(prizesSectionDegree[i]),
                }}
              >
                <span
                  className="prize"
                  style={{
                    // TODO find a way to clip text
                    shapeOutside: calcClipPath(prizesSectionDegree[i]),
                  }}
                >
                  {prize.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="spin-btn" onClick={onSpinHandler()}>
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
