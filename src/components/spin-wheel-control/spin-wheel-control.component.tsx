import { ChangeEvent, ChangeEventHandler } from "react";
import { Prize, SpinWheelSetting } from "../../App";
import "./spin-wheel-control.styles.scss";

const SpinWheelControl = ({
  spinWheelSetting: { prizes, landOnIdx },
  onLandOnIdxChangeHandler,
  onPrizeNameChangeHandler,
  onProportionChangeHandler,
  onDeleteHandler,
  onResetHandler,
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
            <span
              style={{
                display: "inline-block",
                width: "4.5em",
                textAlign: "center",
              }}
            >
              {index === landOnIdx ? (
                "✨"
              ) : (
                <button
                  aria-label="change land on button"
                  // style={{ fontSize: "0.5em" }}
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
                style={{ maxWidth: "4.5rem" }}
                value={prize.name}
                onChange={(event) => onPrizeNameChangeHandler(event, index)}
              />
            </span>
            <span>
              proportion:
              <input
                aria-label="proportion input box"
                type="number"
                style={{ maxWidth: "2.5rem" }}
                value={prize.proportion}
                min="0.01"
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
      <button
        aria-label="reset button"
        onClick={onResetHandler}
        style={{ float: "right" }}
      >
        Reset
      </button>
    </div>
  );
};
export default SpinWheelControl;
