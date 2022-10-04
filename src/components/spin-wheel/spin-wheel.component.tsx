import { useEffect, useState } from "react";
import { SpinWheelSetting } from "../../App";
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
  const {
    prizes,
    landOnIdx,
    ux: { baseRotationTime, baseDegree },
  } = spinWheelSetting;

  // for spin animations
  const [innerWheelRotate, setInnerWheelRotate] = useState(0);

  // TODO here is sus, find a better way to update calcDegree
  // calc the angle of the prizes board sector
  const [prizesSectionDegree, setPrizesSectionDegree] = useState<number[]>(
    Array(prizes.length).fill(0)
  );
  useEffect(() => {
    // TODO fix - when detelling prizes, board has delayed update(cause flashing)
    setPrizesSectionDegree(() => {
      let sumOfProportion = prizes.reduce((pre, curr) => {
        return pre + curr.proportion;
      }, 0);

      return prizes.map((prize) => {
        return (360 / sumOfProportion) * prize.proportion;
      });
    });
  }, [...prizes.map((prize) => prize.proportion)]);

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
        // 將新base度數改為360倍數(方便計算)
        var newBaseDegree =
          baseDegree + lastRotate - ((baseDegree + lastRotate) % 360);
        // 決定要落在哪區的度數，位於中間
        var landOnDegreeCenter = getInitPrizeRotate(landOnIdx);
        // 決定要落在這區的哪個範圍，可以選擇只落在前半，注意不要偏差太多跑到別區
        var landOnDegreeOffset = getRandomIntBetween(
          landOnDegreeCenter - (prizesSectionDegree[landOnIdx] / 2) * 0.9,
          landOnDegreeCenter + (prizesSectionDegree[landOnIdx] / 2) * 0.9
        );
        // 因為轉盤順序是向右，轉的動作是向左，所以要用 360-算出度數
        var landOnDegree = 360 - landOnDegreeOffset;
        return newBaseDegree + landOnDegree;
      });
    };
  }

  function getInitPrizeRotate(index: number) {
    if (prizesSectionDegree.length === 0) return 0;

    let startOffSet = prizesSectionDegree[0] / 2;
    let endOffSet = prizesSectionDegree[index] / 2;
    let sumToIndexDegree = 0;
    for (let i = 0; i <= index; i++) {
      sumToIndexDegree += prizesSectionDegree[i];
    }
    return sumToIndexDegree - startOffSet - endOffSet;
  }

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
