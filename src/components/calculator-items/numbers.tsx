import React from 'react';
import {numbers} from '../../constants';
import Button from '../UI/button/button';
import {CalculatorItemProps} from '../../models';
import {useActions} from '../../hooks/useActions';
import {useAppSelector} from '../../hooks/redux';
import {selectMode, selectOperation} from '../../store/slices/calculatorSlice';
import {isConstructorMode} from '../../utils';

const Numbers: React.FC<CalculatorItemProps> = ({
                                                  item,
                                                  draggable,
                                                  onDragStart,
                                                  onDragEnd,
                                                  onDrop,
                                                  onDoubleClick,
                                                  onDragOver,
                                                  onDragLeave,
                                                  className
                                                }) => {
  const mode = useAppSelector(selectMode);
  const operation = useAppSelector(selectOperation);
  const {setLeftOperand, setRightOperand} = useActions();
  const onNumberClick = (value: number) => {
    if (operation) {
      setRightOperand(value);
    } else {
      setLeftOperand(value);
    }
  };

  const onQuoteClick = () => {
    if (operation) {
      setRightOperand(',');
    } else {
      setLeftOperand(',');
    }
  }
  return (
    <div draggable={draggable}
         className={draggable ? className : className + ' dropped'}
         onDragLeave={onDragLeave ? onDragLeave : undefined}
         onDragStart={onDragStart ? () => onDragStart(item) : undefined}
         onDragEnd={onDragEnd ? (e) => onDragEnd(e, item) : undefined}
         onDrop={onDrop ? (e) => onDrop(e, item) : undefined}
         onDragOver={onDragOver && draggable ? onDragOver : undefined}
         onDoubleClick={onDoubleClick ? () => onDoubleClick(item) : undefined}
    >
      {numbers.map(number =>
        <Button key={number}
                onClick={isConstructorMode(mode) ? undefined : () => onNumberClick(number)}
                className={draggable ? 'btn draggable number' : 'btn number'}
        >
          {number}
        </Button>
      )}
      <Button
        className={draggable ? 'btn draggable number' : 'btn number'}
        onClick={isConstructorMode(mode) ? undefined : onQuoteClick}
      >,
      </Button>
    </div>
  );
};

export default Numbers;