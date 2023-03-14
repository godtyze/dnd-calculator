import React from 'react';
import Button from '../UI/button/button';
import {CalculatorItemProps} from '../../models';
import {useAppSelector} from '../../hooks/redux';
import {
  selectDropAreaItems,
  selectLeftOperand, selectMode,
  selectOperation,
  selectRightOperand
} from '../../store/slices/calculatorSlice';
import {useActions} from '../../hooks/useActions';
import {calculate} from '../../utils/calculate';
import {isConstructorMode} from '../../utils';

const Equals: React.FC<CalculatorItemProps> = ({
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
  const dropAreaItems = useAppSelector(selectDropAreaItems);
  const mode = useAppSelector(selectMode);
  const leftOperand = useAppSelector(selectLeftOperand);
  const rightOperand = useAppSelector(selectRightOperand);
  const operation = useAppSelector(selectOperation);
  const {setOutput} = useActions()

  const onClick = () => {
    const leftFinal = leftOperand.replace(',', '.');
    const rightFinal = rightOperand.replace(',', '.');
    const result = calculate(+leftFinal, +rightFinal, operation);

    if (isNaN(result) || result === Infinity) {
      setOutput('Не определено');
    } else {
      setOutput((+result.toFixed(6)).toString().replace('.', ','));
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
      <Button
        className={draggable && dropAreaItems.includes(item) ? 'btn equals__btn dropped' : 'btn equals__btn'}
        onClick={isConstructorMode(mode) ? undefined : onClick}
      >
        <div className='equals__btn-wrapper'>=</div>
      </Button>
    </div>
  );
};

export default Equals;