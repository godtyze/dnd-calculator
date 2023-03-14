import React from 'react';
import {CalculatorItemProps} from '../../models';
import {useAppSelector} from '../../hooks/redux';
import {
  selectDropAreaItems,
  selectLeftOperand, selectOperation,
  selectOutput,
  selectRightOperand
} from '../../store/slices/calculatorSlice';

const Result: React.FC<CalculatorItemProps> = ({
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
  const leftOperand = useAppSelector(selectLeftOperand);
  const rightOperand = useAppSelector(selectRightOperand);
  const operation = useAppSelector(selectOperation);
  const output = useAppSelector(selectOutput);

  return (
    <div draggable={draggable && !dropAreaItems.includes(item)}
         className={draggable ? className : className + ' dropped'}
         onDragLeave={onDragLeave ? onDragLeave : undefined}
         onDragStart={onDragStart ? () => onDragStart(item) : undefined}
         onDragEnd={onDragEnd ? (e) => onDragEnd(e, item) : undefined}
         onDrop={onDrop ? (e) => onDrop(e, item) : undefined}
         onDragOver={onDragOver && draggable ? onDragOver : undefined}
         onDoubleClick={onDoubleClick ? () => onDoubleClick(item) : undefined}
    >
      <div draggable={false} className="result__wrapper">
        {!leftOperand && !rightOperand && output}
        {!operation && leftOperand}
        {operation && !rightOperand && leftOperand}
        {operation && rightOperand}
      </div>
    </div>
  );
};

export default Result;