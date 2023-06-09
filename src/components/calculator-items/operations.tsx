import React from 'react';
import {operations} from '../../constants';
import Button from '../UI/button/button';
import {CalculatorItemProps, OperationType} from '../../models';
import {useAppSelector} from '../../hooks/redux';
import {selectMode, selectOperation} from '../../store/slices/calculatorSlice';
import {isConstructorMode} from '../../utils';
import {useActions} from '../../hooks/useActions';

const Operations: React.FC<CalculatorItemProps> = ({
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
  const currentOperation = useAppSelector(selectOperation);
  const {setOperation} = useActions();

  const onClick = (operation: OperationType) => {
    if (isConstructorMode(mode)) return;
    setOperation(operation);
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
      {Object.values(operations).map(operation =>
        <Button key={operation}
                onClick={() => onClick(operation)}
                className={draggable ? 'btn draggable' : 'btn'}
                active={operation === currentOperation}
        >
          {operation}
        </Button>
      )}
    </div>
  );
};

export default Operations;