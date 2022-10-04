import { ChangeEvent, ChangeEventHandler } from "react";
import { Prize, SpinWheelSetting } from "../../App";
import "./spin-wheel-control.styles.scss";

const SpinWheelControl = ({
  spinWheelSetting: { prizes, landOnIdx, ux },
  onLandOnIdxChangeHandler,
  onPrizeNameChangeHandler,
  onProportionChangeHandler,
  onDeleteHandler,
  onResetHandler,
  onToggleSpinAnimationHandler,
}: {
  spinWheelSetting: SpinWheelSetting;
  onLandOnIdxChangeHandler: (index: number) => void;
  onPrizeNameChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onProportionChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onDeleteHandler: (prize: Prize) => void;
  onResetHandler: () => void;
  onToggleSpinAnimationHandler: () => void;
}) => {
  return (
    <div className="spin-wheel-control">
      <div className="prizes-container">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="prize-row"
            style={{
              color: prize.color,
              backgroundColor: prize.bgColor,
            }}
          >
            <span className="select-btn">
              {index === landOnIdx ? (
                "✨"
              ) : (
                <button
                  aria-label="change land on button"
                  onClick={() => onLandOnIdxChangeHandler(index)}
                >
                  PICK
                </button>
              )}
            </span>
            <span>
              name:
              {/* TODO implement ReactLink */}
              <input
                aria-label="prizes name input box"
                type="text"
                className="name-input"
                value={prize.name}
                onChange={(event) => onPrizeNameChangeHandler(event, index)}
              />
            </span>
            <span>
              proportion:
              <input
                aria-label="proportion input box"
                type="number"
                className="proportion-input"
                value={prize.proportion}
                min="1"
                onChange={(event) => onProportionChangeHandler(event, index)}
              />
            </span>
            <button
              aria-label="delete button"
              onClick={() => onDeleteHandler(prize)}
            >
              -
            </button>
          </div>
        ))}
      </div>
      {/* TODO encapsul id */}
      <input
        type="checkbox"
        id="animation-toggle"
        value="spinAniEnable"
        checked={ux.spinAniEnable}
        onChange={onToggleSpinAnimationHandler}
      />
      <label htmlFor="animation-toggle">animation toggle</label>
      <button
        aria-label="reset button"
        onClick={onResetHandler}
        className="reset-button"
      >
        Reset
      </button>
    </div>
  );
};
export default SpinWheelControl;
