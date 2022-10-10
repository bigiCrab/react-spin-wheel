import { useContext } from "react";
import { SpinWheelSettingContext } from "../../contexts/spin-wheel-setting.context";
import "./spin-wheel-control.styles.scss";

const SpinWheelControl = () => {
  const { spinWheelSetting, setSpinWheelSetting, resetSpinWheelSetting } =
    useContext(SpinWheelSettingContext);
  const { prizes, landOnIdx, ux } = spinWheelSetting;

  // TODO reduce those onChange function, move to context file?
  // TODO fix ts type
  const onChangeHandlerFactory =
    (typeConstructor: NumberConstructor) => (event: any) => {
      const { name, value } = event.target as { [key: string]: string };
      setSpinWheelSetting({
        ...spinWheelSetting,
        [name]: typeConstructor(value),
      });
    };
  const onChangeNumberHandler = onChangeHandlerFactory(Number);
  // TODO fix ts type
  const onPrizesChangedHandler = (index: number) => (event: any) => {
    const { name, value, type } = event.target as { [key: string]: string };
    const newPrizes = [...spinWheelSetting.prizes];
    newPrizes[index] = {
      ...newPrizes[index],
      [name]: type === "number" ? Number(value) : value,
    };

    setSpinWheelSetting({
      ...spinWheelSetting,
      prizes: newPrizes,
    });
  };
  // TODO fix ts type
  const onPrizesDeleteHandler = (index: number) => (event: any) => {
    setSpinWheelSetting((pre) => ({
      ...pre,
      prizes: pre.prizes.filter((v, i) => i !== index),
    }));
  };
  // TODO fix ts type
  const onUxChangedHandler = (event: any) => {
    const { name, value, type, checked } = event.target as {
      [key: string]: string;
    };
    setSpinWheelSetting({
      ...spinWheelSetting,
      ux: {
        ...spinWheelSetting.ux,
        [name]: type !== "checkbox" ? value : checked,
      },
    });
  };

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
                  name="landOnIdx"
                  value={index}
                  onClick={onChangeNumberHandler}
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
                className="name-input"
                type="text"
                name="name"
                value={prize.name}
                onChange={onPrizesChangedHandler(index)}
              />
            </span>
            <span>
              proportion:
              <input
                aria-label="proportion input box"
                className="proportion-input"
                min="1"
                type="number"
                name="proportion"
                value={prize.proportion}
                onChange={onPrizesChangedHandler(index)}
              />
            </span>
            <button
              aria-label="delete button"
              onClick={onPrizesDeleteHandler(index)}
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
        name="spinAniEnable"
        checked={ux.spinAniEnable}
        onChange={onUxChangedHandler}
      />
      <label htmlFor="animation-toggle">animation toggle</label>
      <button
        aria-label="reset button"
        onClick={resetSpinWheelSetting}
        className="reset-button"
      >
        Reset
      </button>
    </div>
  );
};
export default SpinWheelControl;
