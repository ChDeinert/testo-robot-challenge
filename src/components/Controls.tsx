import React, { useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRobotContext } from '../context/RobotContext';
import { DirectionType } from '../lib/robot';
import SVGButton from './SVGButton';
import ArrowLeft from '../assets/svg/duotone-undo-svgrepo-com.svg';
import ArrowUp from '../assets/svg/duotone-arrow-up-svgrepo-com.svg';
import ArrowRight from '../assets/svg/duotone-redo-svgrepo-com.svg';
import QuestionMark from '../assets/svg/duotone-question-small-svgrepo-com.svg';
import './Controls.css';

type FormValues = {
  xCoordinate: string;
  yCoordinate: string;
  direction: string;
};

const Controls : React.FC = () => {
  const { 
    settings: { board, possibleDirections }, 
    state: { initialized }, 
    controls
  } = useRobotContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onPlace : SubmitHandler<FormValues> = useCallback(({ xCoordinate, yCoordinate, direction } : FormValues) => {
    controls?.place(parseInt(xCoordinate), parseInt(yCoordinate), direction as DirectionType);
  }, [ controls ]);
  const onMoveClick = useCallback(() => {
    controls?.move();
  }, [ controls ]);
  const onLeftClick = useCallback(() => {
    controls?.turnLeft();
  }, [ controls ]);
  const onRightClick = useCallback(() => {
    controls?.turnRight();
  }, [ controls ]);
  const onReportPositionClick = useCallback(() => {
    const currentPositionReport = controls?.report();
    if (currentPositionReport) {
      alert(`The Robot's current position: ${currentPositionReport}`);
    }
  }, [ controls ]);

  return !initialized ? (<p>loading...</p>) : (
    <>
      <div className="controls__buttons" data-testid="robotcontrolbuttons">
        <SVGButton onClickHandler={onLeftClick} title="Turn left" data-testid="robotcontrol-button-turnleft">
          <ArrowLeft aria-hidden="true" />
        </SVGButton>
        <SVGButton onClickHandler={onMoveClick} title="Move Robot" data-testid="robotcontrol-button-move">
          <ArrowUp aria-hidden="true" />
        </SVGButton>
        <SVGButton onClickHandler={onRightClick} title="Turn right" data-testid="robotcontrol-button-turnright">
          <ArrowRight aria-hidden="true" />
        </SVGButton>
      </div>
      <div className="controls__buttons">
        <SVGButton onClickHandler={onReportPositionClick} data-testid="robotcontrol-button-report">
          <QuestionMark aria-hidden="true" /> Report current position
        </SVGButton>
      </div>
      <form onSubmit={handleSubmit(onPlace)} className="controls__form" data-testid="robotplaceform">
        <label htmlFor="xCoordinate" className="controls__form__group controls__form__label">
          X-Coordinate: 
          <input 
            type="number" 
            {...register('xCoordinate', { required: true, min: 0, max: board.xWidth - 1 })} 
            min={0} 
            max={board.xWidth - 1} 
            size={1} 
            className="controls__form__input" 
          />
          <span className="controls__form__group__warning">{errors.xCoordinate?.type === 'required' && 'X-Coordinate is required!'}</span>
        </label>
        <label htmlFor="yCoordinate" className="controls__form__group controls__form__label">
          Y-Coordinate: 
          <input 
            type="number" 
            {...register('yCoordinate', { required: true, min: 0, max: board.yWidth - 1 })} 
            min={0} 
            max={board.yWidth - 1} 
            size={1} 
            className="controls__form__input" 
          />
          <span className="controls__form__group__warning">{errors.yCoordinate?.type === 'required' && 'Y-Coordinate is required!'}</span>
        </label>
        <label htmlFor="direction" className="controls__form__group controls__form__label">
          Facing direction:
          <select {...register('direction', { required: true })} className="controls__form__input">
            {possibleDirections.map((direction, index) => (<option key={`direction_${index}`} value={direction}>{direction}</option>))}
          </select>
        </label>
        <input type="submit" value="Place Robot" className="controls__form__input" />
      </form>
    </>
  );
};

export default Controls;